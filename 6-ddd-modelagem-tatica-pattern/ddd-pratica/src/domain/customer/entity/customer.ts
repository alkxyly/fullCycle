import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _enviaConsoleLogHandler: EnviaConsoleLogHandler;
  private _eventDispatcher: EventDispatcher;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();

    this._enviaConsoleLogHandler =  new EnviaConsoleLogHandler();
    this._eventDispatcher = new EventDispatcher();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  get enviaConsoleLogHandler(): EnviaConsoleLogHandler {
    return this._enviaConsoleLogHandler;
  }

  get eventDispatcher(): EventDispatcher {
    return this._eventDispatcher;
  }
  
  changeAddress(address: Address) {    
    this._address = address;
    
    this._eventDispatcher.register("CustomerAddressChangedEvent", this._enviaConsoleLogHandler); 

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      address: this._address
    }); 

    this._eventDispatcher.notify(customerAddressChangedEvent);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
