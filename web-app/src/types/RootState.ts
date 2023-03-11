export type LRUValue = {
  key: number;
  value: number;
};

export interface RootState {
  category: number;
  LRUCache: LRUValue[];
  result: number | string;
}
