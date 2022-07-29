export namespace Components {
  namespace Select {
    interface Option {
      text: string;
      label?: string | React.ReactNode;
      value?: string | number;
      uid?: string | number;
    }
    
    interface Props {
      options: Option[];
      placeholder?: string;
      onChange?: (option: Option) => void;
    }
  }
}
