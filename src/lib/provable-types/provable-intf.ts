import type { Field } from '../field.js';

export { Provable, ProvablePure };

/**
 * `Provable<T>` is the general interface for provable types in o1js.
 *
 * `Provable<T>` describes how a type `T` is made up of {@link Field} elements and "auxiliary" (non-provable) data.
 *
 * `Provable<T>` is the required input type in several methods in o1js.
 * One convenient way to create a `Provable<T>` is using `Struct`.
 *
 * All built-in provable types in o1js ({@link Field}, {@link Bool}, etc.) are instances of `Provable<T>` as well.
 *
 * Note: These methods are meant to be used by the library internally and are not directly when writing provable code.
 */
interface Provable<T> {
  /**
   * A function that takes `value`, an element of type `T`, as argument and returns
   * an array of {@link Field} elements that make up the provable data of `value`.
   *
   * @param value - the element of type `T` to generate the {@link Field} array from.
   *
   * @return A {@link Field} array describing how this `T` element is made up of {@link Field} elements.
   */
  toFields: (value: T) => Field[];

  /**
   * A function that takes `value` (optional), an element of type `T`, as argument and
   * returns an array of any type that make up the "auxiliary" (non-provable) data of `value`.
   *
   * @param value - the element of type `T` to generate the auxiliary data array from, optional.
   * If not provided, a default value for auxiliary data is returned.
   *
   * @return An array of any type describing how this `T` element is made up of "auxiliary" (non-provable) data.
   */
  toAuxiliary: (value?: T) => any[];

  /**
   * A function that returns an element of type `T` from the given provable and "auxiliary" data.
   *
   * This function is the reverse operation of calling {@link toFields} and {@link toAuxilary} methods on an element of type `T`.
   *
   * @param fields - an array of {@link Field} elements describing the provable data of the new `T` element.
   * @param aux - an array of any type describing the "auxiliary" data of the new `T` element, optional.
   *
   * @return An element of type `T` generated from the given provable and "auxiliary" data.
   */
  fromFields: (fields: Field[], aux: any[]) => T;

  /**
   * Return the size of the `T` type in terms of {@link Field} type, as {@link Field} is the primitive type.
   *
   * @return A `number` representing the size of the `T` type in terms of {@link Field} type.
   */
  sizeInFields(): number;

  /**
   * Add assertions to the proof to check if `value` is a valid member of type `T`.
   * This function does not return anything, instead it creates any number of assertions to prove that `value` is a valid member of the type `T`.
   *
   * For instance, calling check function on the type {@link Bool} asserts that the value of the element is either 1 or 0.
   *
   * @param value - the element of type `T` to put assertions on.
   */
  check: (value: T) => void;
}

/**
 * `ProvablePure<T>` is a special kind of {@link Provable} interface, where the "auxiliary" (non-provable) data is empty.
 * This means the type consists only of field elements, in that sense it is "pure".
 * Any instance of `ProvablePure<T>` is also an instance of `Provable<T>` where the "auxiliary" data is empty.
 *
 * Examples where `ProvablePure<T>` is required are types of on-chain state, events and actions.
 */
interface ProvablePure<T> extends Provable<T> {
  toAuxiliary: (value?: T) => any[];
  fromFields: (fields: Field[]) => T;
}
