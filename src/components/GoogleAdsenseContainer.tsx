import {useEffect} from 'react'

declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[]
    }
}

const GoogleAdsenseContainer = ({client, slot}: { client: string, slot: string }) => {

    useEffect(() => {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }, [])

    return (
        <div style={{textAlign: 'left', overflow: 'hidden'}}>
            <span style={{fontSize: '12px'}}>Advertisment</span>
            <ins
                className="adsbygoogle"
                style={{display: 'block'}}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    )
}

export default GoogleAdsenseContainer