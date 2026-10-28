import {MarketingPage} from '@/components/marketing-page';import {alternates} from '@/lib/public-i18n';
export const metadata={alternates:alternates('/')};
export default function Page(){return <MarketingPage locale="en" page="home"/>;}
