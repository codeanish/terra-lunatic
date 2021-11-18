import React from 'react';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import styles from './share.module.scss'

export interface Props{
    description: string,
    myScore: number,
    totalAvailableScore: number
}

const Share = (props: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>Let everyone know how much of a lunatic you are</div>
            <TwitterShareButton title={"How much of a lunatic am i? I'm " + props.myScore + "/" + props.totalAvailableScore + " on the lunacy scale. " + props.description + ". How much of a lunatic are you?"} url={"https://terra-lunatic.com/"} hashtags={["lunatic", "terra", "luna"]}><TwitterIcon size={64} round /></TwitterShareButton>
        </div>
    )
}

export default Share;