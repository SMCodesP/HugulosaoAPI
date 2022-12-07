import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useField } from '@unform/core';

import { DefaultInputText, GroupInput, LabelInput } from './styles';

// import { Container } from './styles';

interface TNumberInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label?: string;
  placeholder?: string;
}

const NumberInput: React.FC<TNumberInput> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  const [localValue, setLocalValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return Number(ref.current.value);
      },
      setValue: (ref, value) => {
        ref.current.value = Number(value);
      },
      clearValue: (ref) => {
        ref.current.value = 0;
      },
    });
  }, [fieldName, registerField]);

  return (
    <GroupInput>
      {label && <LabelInput htmlFor={name}>{label}</LabelInput>}
      <DefaultInputText
        ref={inputRef}
        id={name}
        defaultValue={defaultValue}
        onChange={(e: any) => setLocalValue(e.target.value)}
        isActived={!!localValue}
        {...rest}
      />
    </GroupInput>
  );
};

export default NumberInput;
