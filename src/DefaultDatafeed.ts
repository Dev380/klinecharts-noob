/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { KLineData } from 'klinecharts'

import { Datafeed, SymbolInfo, Period, DatafeedSubscribeCallback } from './types'


export default class DefaultDatafeed implements Datafeed {
  constructor (apiKey: string) {
    this._apiKey = apiKey
  }

  private _apiKey: string

  private _prevSymbolMarket?: string

  private _ws?: WebSocket

  async getHistoryKLineData (symbol: SymbolInfo, period: Period, from: number, to: number): Promise<KLineData[]> {
    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol.ticker}/range/${period.multiplier}/${period.timespan}/${from}/${to}?apiKey=${this._apiKey}`)
    const result = await response.json()
    return await (result.results || []).map((data: any) => ({
      timestamp: data.t,
      open: data.o,
      high: data.h,
      low: data.l,
      close: data.c,
      volume: data.v,
      turnover: data.vw
    }))
  }

  subscribe (symbol: SymbolInfo, period: Period, callback: DatafeedSubscribeCallback): void {
    if (this._prevSymbolMarket !== symbol.market) {
      this._ws?.close()
      this._ws = new WebSocket(`wss://delayed.polygon.io/${symbol.market}`)
      this._ws.onopen = () => {
        this._ws?.send(JSON.stringify({ action: 'auth', params: this._apiKey }))
      }
      this._ws.onmessage = event => {
        const result = JSON.parse(event.data)
        if (result[0].ev === 'status') {
          if (result[0].status === 'auth_success') {
            this._ws?.send(JSON.stringify({ action: 'subscribe', params: `T.${symbol.ticker}`}))
          }
        } else {
          if ('sym' in result) {
            callback({
              timestamp: result.s,
              open: result.o,
              high: result.h,
              low: result.l,
              close: result.c,
              volume: result.v,
              turnover: result.vw
            })
          }
        }
      }
    } else {
      this._ws?.send(JSON.stringify({ action: 'subscribe', params: `T.${symbol.ticker}`}))
    }
    this._prevSymbolMarket = symbol.market
  }

  unsubscribe(symbol: SymbolInfo, period: Period): void {
  }
}
