import { useState, useCallback, useMemo } from "react";

/* --------------------------------------------------
   Types
-------------------------------------------------- */
interface UseFormValidationReturn<T> {
  form: T;
  errors: Partial<Record<keyof T, string>>;
  setForm: (form: T) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  handleChange: <K extends keyof T>(field: K, value: T[K]) => void;
  validate: () => Partial<Record<keyof T, string>>;
  hasErrors: boolean;
  resetForm: () => void;
}

/* --------------------------------------------------
   Hook
-------------------------------------------------- */
export const useFormValidation = <T extends Record<string, any>>(
  initialForm: T,
  validationFn: (form: T) => Partial<Record<keyof T, string>>
): UseFormValidationReturn<T> => {
  const [form, setForm] = useState<T>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  /* --------------------------------------------------
     Field setter (RN style)
  -------------------------------------------------- */
  const handleChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  /* --------------------------------------------------
     Validate form
  -------------------------------------------------- */
  const validate = useCallback(() => {
    const validationErrors = validationFn(form);
    setErrors(validationErrors || {});
    return validationErrors || {};
  }, [form, validationFn]);

  /* --------------------------------------------------
     Derived state
  -------------------------------------------------- */
  const hasErrors = useMemo(
    () => Object.keys(errors).length > 0,
    [errors]
  );

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
  }, [initialForm]);

  /* --------------------------------------------------
     Public API
  -------------------------------------------------- */
  return {
    form,
    errors,
    setForm,
    setErrors,
    handleChange,
    validate,
    hasErrors,
    resetForm,
  };
};

export default useFormValidation;
