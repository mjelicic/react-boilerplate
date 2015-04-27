// import config from './config';
import messages from '../client/messages';

const initialLocale = 'en';

export default {
  $pendingActions: {},
  i18n: {
    formats: {},
    locales: initialLocale,
    messages: messages[initialLocale]
  }
};
