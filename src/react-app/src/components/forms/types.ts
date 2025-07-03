
export interface DropdownOption {
  value: string;
  text: string | React.ReactNode;
}

export type FetchOptionsFunction = () => Promise<DropdownOption[]>;
