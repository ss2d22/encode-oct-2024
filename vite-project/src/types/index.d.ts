declare type signOptions =
  | {
      network?: string;
      networkPassphrase?: string;
      accountToSign?: string;
    }
  | undefined;

interface ItemAttributes {
  key: {
    _switch: {
      name: string;
      value: number;
    };
    _arm: string;
    _armType: {
      _maxLength: number;
    };
    _value: {
      type: string;
      data: number[];
    };
  };
  val: {
    _switch: {
      name: string;
      value: number;
    };
    _arm: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _value: any;
  };
}

interface Item {
  _attributes: ItemAttributes;
}

interface ServiceListing {
  active_jobs: number;
  contact: string;
  freelancer: string;
  id: Buffer;
  price: number;
  title: string;
  weekly_limit: number;
}
