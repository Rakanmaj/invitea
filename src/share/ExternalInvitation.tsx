import {useEffect} from 'react';
import {useLanguage} from '../i18n';
import {invitationShares} from './metadata';
import {useShareMetadata} from './useShareMetadata';

/** A branded sharing URL; the original live invitation stays on its own host. */
export default function ExternalInvitation({slug}:{slug:'lelyan-rama'|'zaffeh'}) {
 const {lang}=useLanguage();
 useShareMetadata(slug,lang);
 const invitation=invitationShares[slug];
 useEffect(()=>{window.location.replace(invitation.externalUrl!);},[invitation]);
 return <main className="page-loading"><a href={invitation.externalUrl}>{lang==='ar'?'افتح الدعوة':'Open the invitation'}</a></main>;
}
