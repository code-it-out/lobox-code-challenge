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
        options?: OptionType[];
        menuRef?: React.ForwardedRef<HTMLUListElement>;
        onChange?: (option?: OptionType, index?: number, evt?: SelectEvent, reason?: SelectReason) => void;
      }
    }

    interface Props extends Pick<Options.Props, 'onChange' | 'options'> {
      placeholder?: string;
      uniqueNewItem?: boolean;
    }
  }
}
