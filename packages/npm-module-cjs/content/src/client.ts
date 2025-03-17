import { ClientOptions } from "../types/index"

export class Client {
  constructor(opts: ClientOptions) {}

  version() {
    return {
      ok: 1
    }
  }
}
