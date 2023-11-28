import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { UserApi, User } from '~/entities/user';
import { validateName } from '../lib';

interface Props {
  onSuccess: () => void;
  onError: () => void;
}

function useAuthMutation(props: Props) {
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: (name: string) =>
      UserApi.createUser({ username: name })
        .then(({ data }) => {
          User.setData(data);

          props.onSuccess();
          return data;
        })
        .catch((cause: Error) => {
          const error = new Error('ERR_AUTH', { cause });

          props.onError();
          console.log(error); //sentry
        }),
  });
}

export function useAuthPageModel() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { isPending, mutate } = useAuthMutation({
    onSuccess() {
      navigate('/', { replace: true });
    },
    onError() {
      setErrorMessage('Произошла ошибка, попробуйте позже');
    },
  });

  function submitName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setValidationMessage('');
    setErrorMessage('');

    const { isValid, message } = validateName(name);

    if (!isValid) {
      setValidationMessage(message);
      return;
    }

    mutate(name);
  }

  function onNameChanged(name: string) {
    setValidationMessage('');
    setErrorMessage('');
    setName(name);
  }

  return {
    name,
    isPending,
    validationMessage,
    errorMessage,
    submitName,
    onNameChanged,
  };
}
