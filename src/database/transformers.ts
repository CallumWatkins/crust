import { TransformFnParams, TransformOptions } from 'class-transformer';
import { None, Option, Some } from 'ts-results';

export const option_to_class: [(params: TransformFnParams) => unknown, TransformOptions] = [
  ({ value }: { value: unknown; }) => (value === null ? None : Some(value)),
  { toClassOnly: true },
];

export const option_to_plain: [(params: TransformFnParams) => unknown, TransformOptions] = [
  ({ value }: { value: Option<unknown> }) => (value.some ? value.val : null),
  { toPlainOnly: true },
];
