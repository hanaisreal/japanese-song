import type { Song } from '../types';
import { akari } from './akari';
import { bansanka } from './bansanka';
import { demo } from './demo';
import { nightDancer } from './nightDancer';

// 새 곡을 추가하려면: 1) src/data/곡이름.ts 파일 생성  2) 여기 배열에 추가
export const songs: Song[] = [akari, nightDancer, bansanka, demo];
