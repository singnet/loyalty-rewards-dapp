import moment from 'moment';
import { checkDateIsGreaterThan, checkDateIsBetween } from './date';

export type AirdropWindowTimeline = {
  airdrop_window_timeline_date: string;
  airdrop_window_timeline_description: string;
  airdrop_window_timeline_title: string;
};

export type AirdropWindow = {
  airdrop_id: number;
  airdrop_window_id: number;
  airdrop_window_order: number;
  airdrop_window_name: string;
  airdrop_window_registration_start_period: string;
  airdrop_window_registration_end_period: string;
  airdrop_window_claim_start_period: string;
  airdrop_window_claim_end_period: string;
  next_window_start_period: string;
  airdrop_window_schedule_description: string;
  airdrop_window_timeline: AirdropWindowTimeline[];
  airdrop_window_total_tokens: number;
  airdrop_window_status?: WindowStatus;
};

export enum WindowStatus {
  UPCOMING = 'UPCOMING',
  REGISTRATION = 'REGISTRATION',
  IDLE = 'IDLE', // Between registration and the claim period
  CLAIM = 'CLAIM',
  LAST_CLAIM = 'LAST_CLAIM',
}

export const AIRDROP_RULE_STRING = 'Loyality Rewards Rules';
export const AIRDROP_TOKEN_DIVISOR = 100000000;
export const AIRDROP_TOKEN_SYMBOL = 'AGIX';
export const AIRDROP_SITE_STRING = 'SingularityNet';
export const AIRDROP_PENDING_CLAIM_STRING = 'There is already a pending claim. Please wait for it to complete';
export const AIRDROP_WINDOW_STRING = 'Airdrop Window';
export const AIRDROP_SCHEDULE_STRING = 'Loyality Rewards Schedule';
export const AIRDROP_SUPPORT_QUERY_STRING = 'Loyality Airdrop Support Enquiry';
export const TOTAL_AIRDROP_TOKENS_STRING = 'Total Airdrop Tokens';
export const TOTAL_AIRDROPS_STRING = 'Airdrops';
export const SUCCESSFUL_REGISTRATION_STRING =
  'Cardano Wallet connected Successfully, You are now registered for Loyalty rewards';
export const SUCCESSFUL_CLAIM_STRING = 'Successfully Claimed Initiated for Window';
export const AIRDROP_ELIGIBILITY_STRING = 'Airdrop Status';
export const AIRDROP_NOT_QUALIFIED_STRING = 'Not Qualified';
export const AIRDROP_WINDOW_INELIGIBILITY_STRING = 'Sorry, You are not qualified for airdrop window ';
export const AIRDROP_CHECK_RULES_SCHEDULE = 'Please check the rules and schedule for the next window.';
export const AIRDROP_HOW_IT_WORKS_STRING = 'How Loyality Rewards works';
export const AIRDROP_TITLE_STRING = 'Loyality Rewards Info:';
export const AIRDROP_DESCRIPTION_STRING =
  'During the first year of Phase Two, 5% of the monthly tranches will be allotted to Phase One AGI (ERC-20) token holders ' +
  'as a reward for loyality and to incentivize participation in the Phase II network.';

export const AIRDROP_LINKS = {
  WEBSITE: 'https://singularitynet.io/',
  BLOG_POST: '',
  WHITEPAPER: 'https://public.singularitynet.io/whitepaper.pdf',
  TELEGRAM: 'https://telegram.me/singularitynet',
  DOCUMENTATION: 'https://dev.singularitynet.io/',
  OFFICIAL_BLOG: 'https://blog.singularitynet.io/',
  TWITTER: 'https://twitter.com/singularity_net',
  FACEBOOK: 'https://www.facebook.com/singularityNET.io',
  LINKEDIN: 'https://www.linkedin.com/company/singularitynet/',
  YOUTUBE: 'https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw',
};

export const AIRDROP_RULES = [
  {
    title: 'AGIX Balance',
    description: 'TBD',
  },
  {
    title: 'Registration',
    description:
      'You must register your Cardano wallet address on this portal to claim your loyality rward. Registration does not cost gas fees, claiming the rewards does cost gas fees.',
  },
];

export const HOW_IT_WORKS = [
  {
    title: 'Requirements for Loyality rewards',
    description:
      'Users will be eligible for the airdrop if they meet two conditions: they must hold a minimum of 2500 ' +
      'AGIX tokens in their wallets at all times during the snapshot periods, and they must register their ' +
      'wallet address here in this portal during every registration period. Registration does not cost gas fees, claiming the rewards does cost gas fees.',
  },
  {
    title: 'Registration for Loyality rewards',
    description: 'Participants need to register their cardano address to claim their loyality rewards, ',
  },
  {
    title: 'Claiming Rewards',
    description:
      'You can claim your Loyality rewards on this portal as they become available in the quarterly tranches, ' +
      'or you can opt to accumulate them until the end in order to save gas fees. ' +
      'You must claim your tokens before November 22th 2022 11 AM UTC; any tokens not claimed by ' +
      'then will be returned to the loyality pool',
  },
];

export const windowStateMap = {
  [WindowStatus.CLAIM]: 'Airdrop Claim Open',
  [WindowStatus.REGISTRATION]: 'Airdrop Registration Open',
  [WindowStatus.UPCOMING]: '',
};

export const windowNameActionMap = {
  [WindowStatus.UPCOMING]: 'Registration',
  [WindowStatus.IDLE]: 'Claiming',
  [WindowStatus.REGISTRATION]: 'Claiming',
  [WindowStatus.CLAIM]: 'Claiming',
  [WindowStatus.LAST_CLAIM]: 'Claiming',
};

export const windowStatusActionMap = {
  [WindowStatus.UPCOMING]: 'Starts',
  [WindowStatus.IDLE]: 'Starts',
  [WindowStatus.REGISTRATION]: 'Closes',
  [WindowStatus.CLAIM]: 'Starts',
  [WindowStatus.LAST_CLAIM]: 'closes',
};

export const windowStatusLabelMap = {
  [WindowStatus.UPCOMING]: 'Airdrop Registration Window',
  [WindowStatus.REGISTRATION]: 'Airdrop Registration Window',
  [WindowStatus.IDLE]: 'Airdrop Claim Window',
  [WindowStatus.CLAIM]: 'Airdrop Claim Window',
  [WindowStatus.LAST_CLAIM]: 'Airdrop Claim Window',
};

export const LOADER_MESSAGE = {
  MAP_CARDANO_WALLET_PROGRESS: 'Mapping to your Cardano wallet Nami in progress',
  CLAIM_PROGRESS: 'Claim in progress',
};

export const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const findActiveWindow = (windows: AirdropWindow[]): AirdropWindow | undefined => {
  const sortedWindows = windows
    .slice()
    .sort((windowA, windowB) => windowA.airdrop_window_id - windowB.airdrop_window_id);

  const todayDate = moment.utc(new Date());

  let activeWindow = sortedWindows[0];
  activeWindow.airdrop_window_status = WindowStatus.CLAIM;
  activeWindow.next_window_start_period = sortedWindows[0].airdrop_window_claim_end_period;
  sortedWindows.map((item, index) => {
    if (
      checkDateIsBetween(
        moment.utc(item.airdrop_window_claim_start_period),
        moment.utc(item.airdrop_window_claim_end_period),
        todayDate
      )
    ) {
      activeWindow = item;
      activeWindow.airdrop_window_status =
        index === sortedWindows.length - 1 ? WindowStatus.LAST_CLAIM : WindowStatus.CLAIM;
      activeWindow.next_window_start_period = sortedWindows[index].airdrop_window_claim_end_period;
    }
  });

  return activeWindow;
};

export const findFirstUpcomingWindow = (windows: AirdropWindow[]): AirdropWindow | undefined => {
  const now = new Date();
  const sortedWindows = windows;

  const firstUpcomingWindow = sortedWindows.find((window) =>
    checkDateIsGreaterThan(window.airdrop_window_registration_start_period, now)
  );
  if (firstUpcomingWindow) {
    firstUpcomingWindow.airdrop_window_status = WindowStatus.UPCOMING;
  }
  return firstUpcomingWindow;
};
