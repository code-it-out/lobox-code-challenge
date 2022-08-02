export namespace Hooks {
  namespace UseClickOutside {
    interface VoidCallback {
      (): void;
    }
  }
}

export namespace Components {
  namespace Select {
    type OptionType = string;
    type OptionsType = OptionType[];

    namespace Option {
      interface Props {
        children: React.ReactNode;
        selected?: boolean;
        itemRef?: React.ForwardedRef<HTMLLIElement>;
        onKeyDown?: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
        onClick?: (evt: React.MouseEvent<HTMLLIElement>) => void;
      }
    }

    namespace Options {
      type SelectEvent = React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>;

      type SelectReason = 'click' | 'enter';

      interface Props {
        isOpen?: boolean;
        options?: OptionsType;
        menuRef?: React.ForwardedRef<HTMLUListElement>;
        onChange?: (option?: OptionType, index?: number, evt?: SelectEvent, reason?: SelectReason) => void;
      }
    }

    interface Props {
      options?: OptionsType;
      placeholder?: string;
      onChange?: (option?: OptionType, index?: number, options?: OptionsType, evt?: SelectEvent, reason?: SelectReason) => void;
      duplicateOptionErrorHandler?: (value?: OptionType) => void;
    }
  }
}
