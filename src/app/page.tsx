'use client';

import Image from 'next/image';
import styles from './page.module.css';
import banner from '@/app/assets/images/banner.jpg';
import Button from './components/button/button';
import Word from './components/word/word';
import { useEffect, useState } from 'react';
import BasicDialog from './dialog/basic-dialog';

export default function Home() {
  const btnList = [
    { label: '活动管理', icon: 'settings' },
    { label: '报名信息', icon: 'id_card' },
    { label: '邀请助力', icon: 'thumb_up' },
    { label: '排行榜', icon: 'trophy' },
    { label: '活动说明', icon: 'chat' },
    { label: '分享', icon: 'share_windows' },
  ];
  const [dialogVisible, setDialogVisible] = useState(false);
  const [chance, setChance] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [words, setWords] = useState([
    { label: '和', count: 0 },
    { label: '美', count: 0 },
    { label: '中', count: 0 },
    { label: '秋', count: 0 },
    { label: '节', count: 0 },
    { label: '团', count: 0 },
    { label: '圆', count: 0 },
    { label: '共', count: 0 },
    { label: '此', count: 0 },
    { label: '时', count: 0 },
  ]);

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (!data) {
      setChance(7);
      return;
    }
    if (data) {
      const { lastDate, words, chance } = JSON.parse(data);
      // if lastdate = today
      if (new Date(lastDate).toDateString() === new Date().toDateString()) {
        setChance(chance);
      } else {
        setChance(chance + 9);
      }
      setWords(words);
    }
  }, []);

  const setData = (words: { label: string; count: number }[], chance: number) => {
    localStorage.setItem(
      'data',
      JSON.stringify({
        lastDate: new Date().toISOString(),
        words: words,
        chance: chance,
      })
    );
  };

  const draw = () => {
    if (chance === 0) {
      return;
    }
    // random number between 0-9
    const random = Math.floor(Math.random() * 10);
    console.log(random);
    setChance(chance - 1);
    setCurrentWord(words[random].label);
    const newWords = words.map((word, index) => {
      if (index === random) {
        return { ...word, count: word.count + 1 };
      } else {
        return word;
      }
    });
    setWords(newWords);
    setData(newWords, chance - 1);
    setDialogVisible(true);
  };

  const getWordLeft = () => {
    // get the number of words left to synthesize
    return words.filter((word) => word.count === 0).length;
  };

  const getCombineChance = () => {
    if (getWordLeft() > 1) {
      return;
    }
    // get smallest count in words
    const minCount = Math.min(...words.map((word) => word.count));
    return minCount;
  };

  return (
    <main className={styles.main}>
      <Image
        src={banner.src}
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.title}>喜迎中秋在线集字活动</h1>
          <span className="material-symbols-outlined">arrow_top_right</span>
        </div>

        <p style={{ color: '#cccccc', fontSize: '14px' }}>活动创建时间: 2022-08-22 17:55:10</p>
        <p className={styles.dateInfo}>活动开始时间: 2022-08-22 00:00:00</p>
        <p className={styles.dateInfo}>活动结束时间: 2022-08-22 23:59:59</p>
        <p className={styles.dateInfo}>活动时间总共: 31天</p>
        <div className={styles.btnWrapper}>
          {btnList.map((btn) => (
            <Button key={btn.label} label={btn.label} icon={btn.icon} />
          ))}
        </div>

        <p style={{ textAlign: 'center', margin: '16px 0' }}>
          {getWordLeft() < 1 ? `你有${getCombineChance()}次抽奖机会` : `加油！还差${getWordLeft()}个字即可合成`}
        </p>

        <div className={styles.wordWrapper}>
          {words.map((word) => (
            <Word label={word.label} count={word.count} key={word.label} />
          ))}
        </div>
        <div className={styles.drawBtnWrapper}>
          <button type="button" className={styles.drawBtn} onClick={() => draw()}>
            抽字<span className={styles.drawBtnSmTxt}>(可抽{chance}次)</span>
          </button>
        </div>
      </div>
      <BasicDialog dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} currentWord={currentWord} />
    </main>
  );
}
