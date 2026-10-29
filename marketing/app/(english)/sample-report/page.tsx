import {MarketingPage} from '@/components/marketing-page';import {source,textFor,alternates} from '@/lib/public-i18n';
const [title,description]=source.meta['sample-report'];export const metadata={title:textFor('en',title),description:textFor('en',description),alternates:alternates('/sample-report')};
export default function Page(){return <MarketingPage locale="en" page="sample-report"/>;}
