import { describe, expect, it } from 'vitest';
import {
  nameLength,
  required,
  successValidation,
  validateName,
} from '../index';

describe('validateName', () => {
  it('should return a validation error if the name is empty', () => {
    expect(validateName('')).toEqual(required);
  });

  it('should return a validation error if the name is less than 2 characters', () => {
    expect(validateName('a')).toEqual(nameLength);
  });

  it('should pass validation', () => {
    expect(validateName('Anuar')).toEqual(successValidation);
  });
});
