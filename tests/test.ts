import { random, randomDecimal } from '../src/random.ts';

const iterations = 1000000;
const results = new Map<number, number>();
for (let i = 0; i < iterations; i++) {
  const num = random(1, 5 + 1);
  results.set(num, (results.get(num) || 0) + 1);
}

for (const [ num, count ] of results) {
  let percents = (count / iterations) * 10000;
  percents = Math.round(percents);
  percents /= 100;
  console.log(`${num}\tx${count}\t(${percents}%)`);
}