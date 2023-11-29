import { UserType } from '~/entities/user';

export function ConnectedUsers({
  users,
  className = '',
}: {
  users: Array<UserType>;
  className?: string;
}) {
  return (
    <div className={className}>
      <ul className="relative flex items-center">
        {users.map(user => (
          <li
            key={user.id}
            className="relative -ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-zim-secondary text-xs font-semibold uppercase text-white duration-200 hover:z-10 hover:scale-105"
          >
            {user.username.slice(0, 2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
