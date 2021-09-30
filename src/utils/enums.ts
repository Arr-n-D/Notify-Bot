import { SubscriptionEnum } from "../enums/SubscriptionEnum";

export function isSubscriptionEnum(value: string): value is SubscriptionEnum {
  return Object.values(SubscriptionEnum).includes(value as SubscriptionEnum);
}
