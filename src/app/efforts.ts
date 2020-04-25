export class Efforts {

  m1 = 0;
  n1 = 0;
  q1 = 0;
  m2 = 0;
  n2 = 0;
  q2 = 0;
  m3 = 0;
  n3 = 0;
  q3 = 0;
  m4 = 0;
  n4 = 0;
  q4 = 0;

  multiplyBy(value: number) {
    this.m1 *= value;
    this.n1 *= value;
    this.q1 *= value;
    this.m2 *= value;
    this.n2 *= value;
    this.q2 *= value;
    this.m3 *= value;
    this.n3 *= value;
    this.q3 *= value;
    this.m4 *= value;
    this.n4 *= value;
    this.q4 *= value;
  }

  resetM(value: number) {
    this.m1 = value;
    this.m2 = value;
    this.m3 = value;
    this.m4 = value;
  }

  chainM(start: number, delta1: number, delta2: number, delta3: number) {
    this.m1 = start;
    this.m2 = this.m1 + delta1;
    this.m3 = this.m2 + delta2;
    this.m4 = this.m3 + delta3;
  }

  transmitM(value1: number, value2: number, delta3: number, value4: number) {
    this.m1 = value1;
    this.m2 = value2;
    this.m3 = this.m2 + delta3;
    this.m4 = value4;
  }

  resetN(value: number) {
    this.n1 = value;
    this.n2 = value;
    this.n3 = value;
    this.n4 = value;
  }

  chainN(start: number, delta1: number, delta2: number, delta3: number) {
    this.n1 = start;
    this.n2 = this.n1 + delta1;
    this.n3 = this.n2 + delta2;
    this.n4 = this.n3 + delta3;
  }

  transmitN(value1: number, value2: number, delta3: number, value4: number) {
    this.n1 = value1;
    this.n2 = value2;
    this.n3 = this.n2 + delta3;
    this.n4 = value4;
  }

  resetQ(value: number) {
    this.q1 = value;
    this.q2 = value;
    this.q3 = value;
    this.q4 = value;
  }

  chainQ(start: number, delta1: number, delta2: number, delta3: number) {
    this.q1 = start;
    this.q2 = this.q1 + delta1;
    this.q3 = this.q2 + delta2;
    this.q4 = this.q3 + delta3;
  }

  transmitQ(value1: number, value2: number, delta3: number, value4: number) {
    this.q1 = value1;
    this.q2 = value2;
    this.q3 = this.q2 + delta3;
    this.q4 = value4;
  }
}
