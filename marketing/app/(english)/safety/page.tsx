import {MarketingPage} from '@/components/marketing-page';import {source,textFor,alternates} from '@/lib/public-i18n';
const [title,description]=source.meta['safety'];export const metadata={title:textFor('en',title),description:textFor('en',description),alternates:alternates('/safety')};
export default function Page(){return <MarketingPage locale="en" page="safety"/>;}
