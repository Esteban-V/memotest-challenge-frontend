import { useState } from 'react';

type FieldArray<T> = {
  fields: T[];
  append: (value: T) => void;
  remove: (index: number) => void;
};

function useFieldArray<T>(initialState: T[]): FieldArray<T> {
  const [fields, setFields] = useState<T[]>(initialState);

  const append = (value: T) => setFields([...fields, value]);

  const remove = (index: number) => setFields(fields.filter((_, i) => i !== index));

  return { fields, append, remove };
}

export default useFieldArray;
