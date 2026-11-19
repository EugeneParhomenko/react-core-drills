import { useState } from 'react';
import './TabsDemo.css';
import { Tabs } from './Tabs';

const CONTROLLED_TAB_LABELS: Record<string, string> = {
  home: 'Головна',
  profile: 'Профіль',
  notifications: 'Сповіщення',
};

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="tabs-demo-page">
      <h2 className="tabs-demo__title">Tabs</h2>
      <p className="tabs-demo__hint">
        Неконтрольований і контрольований режими compound-компонента.
      </p>

      <section className="tabs-demo__section" aria-labelledby="tabs-uncontrolled-heading">
        <h3 id="tabs-uncontrolled-heading" className="tabs-demo__section-title">
          Неконтрольований
        </h3>
        <p className="tabs-demo__section-desc">
          <code>defaultValue</code> — стан всередині <code>Tabs</code>. Одна
          вкладка вимкнена.
        </p>
        <Tabs defaultValue="home">
          <Tabs.List aria-label="Неконтрольовані вкладки">
            <Tabs.Trigger value="home">Головна</Tabs.Trigger>
            <Tabs.Trigger value="about">Про нас</Tabs.Trigger>
            <Tabs.Trigger value="settings" disabled>
              Налаштування
            </Tabs.Trigger>
            <Tabs.Trigger value="contact">Контакт</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="home">
            Внутрішній стан: клік по вкладках не потребує <code>useState</code>{' '}
            у батьківському компоненті.
          </Tabs.Panel>
          <Tabs.Panel value="about">
            <code>Tabs.Trigger disabled</code> пропускається в roving tabIndex і
            клавіатурній навігації.
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            Ця панель недоступна, поки вкладка вимкнена.
          </Tabs.Panel>
          <Tabs.Panel value="contact">
            Контактна інформація — четверта вкладка в демо.
          </Tabs.Panel>
        </Tabs>
      </section>

      <section className="tabs-demo__section" aria-labelledby="tabs-controlled-heading">
        <h3 id="tabs-controlled-heading" className="tabs-demo__section-title">
          Контрольований
        </h3>
        <p className="tabs-demo__section-desc">
          <code>value</code> + <code>onValueChange</code> — активну вкладку
          можна змінювати ззовні.
        </p>
        <button
          type="button"
          className="tabs-demo__external-btn"
          onClick={() => setActiveTab('notifications')}
        >
          Перейти до сповіщень
        </button>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List aria-label="Контрольовані вкладки">
            <Tabs.Trigger value="home">Головна</Tabs.Trigger>
            <Tabs.Trigger value="profile">Профіль</Tabs.Trigger>
            <Tabs.Trigger value="notifications">Сповіщення</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Panel value="home">
            Зовнішній стан: поточне значення —{' '}
            <code>{activeTab}</code>.
          </Tabs.Panel>
          <Tabs.Panel value="profile">
            Профіль користувача. Спробуй кнопку знизу або перемикай вкладки.
          </Tabs.Panel>
          <Tabs.Panel value="notifications">
            Сюди переходить зовнішня кнопка «Перейти до сповіщень».
          </Tabs.Panel>
        </Tabs>
        <p className="tabs-demo__active-label">
          Активна вкладка:{' '}
          <strong>
            {CONTROLLED_TAB_LABELS[activeTab] ?? activeTab}
          </strong>
        </p>
      </section>
    </div>
  );
}