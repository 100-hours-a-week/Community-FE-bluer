import { useState } from "react";

export function useJoinStep(props) {
  const {
    formKey,
    validator,
    checker,
    formData,
    setFormData,
    completedSteps,
    setCompletedSteps,
    onSuccess,
  } = props;

  const [value, setValue] = useState(formData[formKey]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (error) {
      setError(null);
    }
  };

  const submit = async () => {
    const validation = validator(value);
    if (validation) {
      setError(validation.message);
      return false;
    }

    if (checker) {
      const errorResult = await checker(value);
      if (errorResult) {
        setError(errorResult.message);
        return false;
      }
    }

    setFormData({ ...formData, [formKey]: value });
    setCompletedSteps({ ...completedSteps, [formKey]: true });

    if (onSuccess) {
      onSuccess();
    }
  };

  return { value, error, handleChange, submit };
}
