import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Spacer,
  Text,
  User,
  Card,
  Loading,
  Pagination,
  Avatar
} from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import Navbar from 'components/Navbar';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN, ko } from 'date-fns/locale';
import UserStore from 'stores/user';
import useToken from 'components/Token';
import { useRouter } from 'next/router';
import SettingsStore from 'stores/settings';
import { pluralize, formatNumber } from 'components/api/utils';
import { Translation, useTranslation } from 'components/intl/Translation';

const Members = observer(() => {
  const token = useToken();
  const router = useRouter();
  const [{ settings, getSettings }] = useState(() => new SettingsStore());
  const [{ loading, page, limit, total, users, setPage, getUsers }] = useState(
    () => new UserStore()
  );

  useEffect(() => {
    getSettings();
    getUsers();
  }, [token]);

  const paginate = () => {
    setPage(page + 1);
    getUsers();
  };

  const lang = settings.language;
  const renderDate = (value: any) => {
    const date: any = value
      ? format(new Date(value), 'MMM d, yyyy @ h:mm a', {
          locale:
            lang === 'es'
              ? es
              : lang === 'fr'
                ? fr
                : lang === 'en'
                  ? enUS
                  : lang === 'ru'
                    ? ru
                    : lang === 'de'
                      ? de
                      : lang === 'cn'
                        ? zhCN
                        : lang === 'ja'
                          ? ja
                          : lang === 'ko'
                            ? ko
                            : null
        })
      : '';
    return <span className="locale-time">{date}</span>;
  };
  const user = users.map((item) => (
    <div className="pointer" key={item.id}>
      <NextLink href={`/u/${item.username}`}>
        <Card shadow className="notification-card">
          <div className="notification">
            <div className="one">
              <Avatar
                src={
                  item.photo ? `/storage/${item.photo}` : '/images/avatar.png'
                }
                w={2}
                h={2}
              />
            </div>
            <div className="two">
              <Text h4 className="text">
                {item.name}
                <Spacer inline />
                <small>@{item.username}</small>
              </Text>
              <Text small>
                <Translation lang={settings?.language} value="Joined" />{' '}
                {renderDate(item.createdAt)}
              </Text>
              <Spacer inline />
              <Text small>
                {formatNumber(item.discussion!)}{' '}
                {useTranslation({
                  lang: settings?.language,
                  value: `Discussion${pluralize(item.discussion!)}`
                })}
              </Text>
            </div>
          </div>
        </Card>
      </NextLink>
    </div>
  ));

  return (
    <div>
      <Navbar title="Members" description="Members" />
      <div className="page-container top-100">
        <div className="notification-container">
          <div className="column">
            <div>
              <Text h3>
                <Translation lang={settings?.language} value={'Members'} />
              </Text>
            </div>
          </div>

          <Spacer h={2} />
          {loading ? (
            <Loading>
              <Translation lang={settings?.language} value="Loading" />
            </Loading>
          ) : (
            user
          )}

          <Spacer />

          {total! >= limit ? (
            <div className="pagination">
              <Pagination
                count={Math.round(total! / limit)}
                initialPage={page}
                limit={limit}
                onChange={paginate}
              >
                <Pagination.Next>
                  <ChevronRightCircle />
                </Pagination.Next>
                <Pagination.Previous>
                  <ChevronLeftCircle />
                </Pagination.Previous>
              </Pagination>
            </div>
          ) : (
            ''
          )}

          <Spacer h={5} />
        </div>
      </div>
    </div>
  );
});

export default Members;
