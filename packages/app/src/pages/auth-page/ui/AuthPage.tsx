import { UiBaseLayout } from '~shared/ui';
import AuthIllustration from './images/auth-illustration.png';
import { useAuthPageModel } from '../model';

export function AuthPage() {
  const {
    name,
    isPending,
    validationMessage,
    errorMessage,
    submitName,
    onNameChanged,
  } = useAuthPageModel();

  return (
    <UiBaseLayout>
      <div className="grid h-full w-full grid-cols-2 items-center">
        <div className="self-center justify-self-center">
          <form
            className="flex w-80 flex-col space-y-3"
            onSubmit={e => submitName(e)}
          >
            <label>
              <span
                className={
                  validationMessage ? 'text-red-500' : 'text-zim-secondary'
                }
              >
                Введите имя
              </span>
              <input
                type="text"
                readOnly={isPending}
                className={`mt-0 block w-full border-0 border-b-2 bg-transparent px-0.5 text-gray-800 focus:border-zim-secondary-dark focus:ring-0 ${
                  validationMessage ? 'border-red-500' : 'border-zim-secondary'
                }`}
                value={name}
                onChange={e => onNameChanged(e.target.value)}
              />
              {(validationMessage || errorMessage) && (
                <span className="text-sm text-red-500">
                  {validationMessage || errorMessage}
                </span>
              )}
            </label>
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-zim-secondary p-4 font-bold text-white outline-none duration-200 hover:opacity-95 focus:ring-1 active:scale-[.99] active:bg-zim-secondary-dark"
            >
              {isPending ? 'Загрузка...' : 'Войти в приложение'}
            </button>
          </form>
        </div>

        <div className="justify-self-center">
          <img className="w-[500px]" src={AuthIllustration} alt="" />
        </div>
      </div>
    </UiBaseLayout>
  );
}
