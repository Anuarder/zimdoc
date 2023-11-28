import type { JSX } from 'react';
import BackgroundImage from '~img/background.png';
import ZimranIcon from '~img/zimran-icon.svg';

export function UiBaseLayout({
  children,
}: {
  children?: string | JSX.Element | JSX.Element[];
}) {
  return (
    <main
      className="h-screen bg-slate-50 bg-contain bg-center bg-no-repeat p-10"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <section className="relative h-full overflow-hidden rounded-3xl border-4 border-zim-secondary">
        <img
          className="absolute left-6 top-6"
          width="23"
          height="23"
          src={ZimranIcon}
          role="presentation"
          alt=""
        />
        {children}
      </section>
    </main>
  );
}
