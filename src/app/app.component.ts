import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TableExport } from 'tableexport';
import { Efforts } from './efforts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  inputForm = this.fb.group({
    // main data
    ns: [null, [Validators.required, Validators.min(1)]],
    h1: [null, [Validators.required, Validators.min(0)]],
    hsh: true,
    // if hsh
    h2: [null, [Validators.required, Validators.min(0)]],
    z: [null, [Validators.required, Validators.min(1)]],
    // + if !hsh
    hic: [null, [Validators.required, Validators.min(0)]],
    zc: [null, [Validators.required, Validators.min(1)]],
    // rigidity
    i1: [null, [Validators.required, Validators.min(0)]],
    i2: [null, [Validators.required, Validators.min(0)]],
    i7: [null, [Validators.required, Validators.min(0)]],
    i3: [null, [Validators.required, Validators.min(0)]],
    i4: [null, [Validators.required, Validators.min(0)]],
    i8: [null, [Validators.required, Validators.min(0)]],
    // column type
    c: '2',
    // if c = 2
    g1: [null, [Validators.required, Validators.min(0)]],
    g8: [null, [Validators.required, Validators.min(0)]],
    s1: [null, [Validators.required, Validators.min(0)]],
    s2: [null, [Validators.required, Validators.min(0)]],
    g3: [null, [Validators.required, Validators.min(0)]],
    g5: [null, [Validators.required, Validators.min(0)]],
    g7: [null, [Validators.required, Validators.min(0)]],
    e3: [null, [Validators.required, Validators.min(0)]],
    w: [null, [Validators.required, Validators.min(0)]],
    w1: [null, [Validators.required, Validators.min(0)]],
    w2: [null, [Validators.required, Validators.min(0)]],
    n6: [null, [Validators.required, Validators.min(0)]],
    n7: [null, [Validators.required, Validators.min(0)]],
    t: [null, [Validators.required, Validators.min(0)]],
    n8: [null, [Validators.required, Validators.min(0)]],
    n9: [null, [Validators.required, Validators.min(0)]],
    t1: [null, [Validators.required, Validators.min(0)]],
    e5: [null, [Validators.required, Validators.min(0)]],
    e6: [null, [Validators.required, Validators.min(0)]],
    e8: [null, [Validators.required, Validators.min(0)]],
    e9: [null, [Validators.required, Validators.min(0)]],
    k: [null, [Validators.required, Validators.min(0)]],
    // + if c = 1
    g2: [null, [Validators.required, Validators.min(0)]],
    g4: [null, [Validators.required, Validators.min(0)]],
    g6: [null, [Validators.required, Validators.min(0)]],
    e7: [null, [Validators.required, Validators.min(0)]],
    e1: [null, [Validators.required, Validators.min(0)]],
    e2: [null, [Validators.required, Validators.min(0)]]
  });

  // result rows
  displayedColumns = ['name', 'index', 'coefficient', 'm2', 'n2', 'm3', 'n3', 'm4', 'n4', 'q4'];
  result = [];
  mMaxType: '1' | '2';
  mMax = 0;

  private tableExport: TableExport;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadInput();
  }

  back() {
    history.back();
  }

  clear() {
    this.result = [];
    this.mMax = 0;
  }

  export(format: string) {
    if (!this.tableExport) {
      this.tableExport = new TableExport(document.getElementById('results'), {
        exportButtons: false,
        bootstrap: false,
        filename: 'rezultate'
      });
    }
    const exportData = this.tableExport.getExportData() as any;
    const values = exportData.results[format];
    this.tableExport.export2file(values.data, values.mimeType, values.filename, values.fileExtension);
  }

  calculate() {
    // clear before all
    this.clear();

    // save input values
    this.saveInput();

    // create row values, as object because
    // we need reference to multiply them correctly
    const efforts = new Efforts();

    // getting input values
    const {
      ns, hsh, h1, h2, z, hic,
      i1, i2, i7, i3, i4, i8,
      c
    } = this.inputForm.value;

    let { zc } = this.inputForm.value;

    let h: number;
    let a: number;
    let m5: number;
    let b1: number;
    let b2: number;
    let b3: number;
    let r1: number;
    let b7: number;
    let b8: number;
    let b9: number;
    let b10: number;
    let b6: number;
    let b: number;
    let r2: number;
    let m6: number;

    if (c === '2') {
      // getting input values
      const {
        g1, g8, s2, s1, g3, g5,
        g7, e3, w, w1, w2, n6,
        n7, t, n8, n9, t1, e5,
        e6, e8, e9, k
      } = this.inputForm.value;

      // letting calculated values
      let hm: number;
      let am: number;

      if (hsh) {
        h = h1 + h2;
        a = h1 / h;
        hm = h;
        am = a;
        zc = z;
      } else {
        hm = h1 + h2;
        am = h1 / hm;
        h = h1 + hic;
        a = h1 / h;
      }

      const k1 = (am ** 3) * (i2 / i1 - 1);
      const k2 = ((1 - am) ** 3) * i2 / i7 / 8 / z / z;
      const k3 = (a ** 3) * (i4 / i3 - 1);
      const k4 = ((1 - a) ** 3) * i4 / i8 / 8 / zc / zc;
      const k5 = 1 + k1 + k2;
      const k6 = k5 * 2 * hm;
      const k15 = 1 + k3 + k4;
      const k16 = k15 * 2 * h;
      const k7 = 3 * i2 / hm / hm / hm / k5;
      const k8 = 3 * i4 / h / h / h / k15;
      const k9 = 2 * k7 + (ns - 2) * k8;
      const a1 = k7 / k9;
      const a2 = k8 / k9;

      // stalpul intermediar, sarcina permanenta
      m5 = g8 * e3 - g1 * e3;
      b1 = -3 * m5 * (1 + k3 / a) / k16;
      efforts.transmitM(m5, m5 + b1 * h1, 0, m5 + b1 * h);
      efforts.resetQ(-b1);
      efforts.chainN(g1 + g8, g5, 2 * g3, g7);

      this.printPermanent(efforts);

      // Eforturile stalpului intermediar de la zapada
      m5 = s2 * e3 - s1 * e3;
      b1 = -3 * m5 * (1 + k3 / a) / k16;
      efforts.transmitM(m5, m5 + b1 * h1, 0, m5 + b1 * h);
      efforts.resetQ(-b1);
      efforts.resetN(s1 + s2);

      this.printSnow(efforts);

      // eforturile din stalpul intermedeiar de la actiunea vintului
      b2 = -3 * w1 * hm * (1 + am * k1 + 1.33 * (1 + am) * k2) / 8 / k5;
      b3 = b2 * w2 / w1;
      b1 = -w + b2 + b3;
      r1 = -b1 * a2;
      efforts.transmitM(0, r1 * h1, 0, r1 * h);
      efforts.resetQ(-r1);
      efforts.resetN(0);

      this.printCentralWind(efforts);

      // stalpul intermediar, sarcina de la podul rulant din stinga
      b7 = -3 * n7 * e5 * (1 - am ** 2) / k6;
      b8 = -3 * n6 * e5 * (1 - am ** 2) / k6;
      b9 = 3 * n6 * e6 * (1 - a ** 2) / k16;
      b10 = 3 * n7 * e6 * (1 - a ** 2) / k16;
      b6 = b9 - (b7 + b9) * a2 / k;
      b = b10 - (b8 + b10) * a2 / k;

      // eforturile de N-max din deschizatura stinga
      efforts.transmitM(0, b * h1, -n7 * e6, b * h - n7 * e6);
      efforts.resetQ(-b);
      efforts.chainN(0, 0, n7, 0);

      this.printCentralN('NS-max', efforts);

      // Calculul eforturilor de la actiunea NS-min
      efforts.transmitM(0, b6 * h1, -n6 * e6, b6 * h - n6 * e6);
      efforts.resetQ(-b6);
      efforts.chainN(0, 0, n6, 0);

      this.printCentralN('NS-min', efforts);

      // Calculul eforturilor de la actiunea fortei TS
      b9 = t * (1 - a + k4) / k15;
      r1 = b9 - b9 * a2 / k;
      m5 = r1 * 0.7 * h1;
      efforts.transmitM(0, r1 * h1 - t * (h1 - 0.7 * h1), 0, r1 * h - t * (h - 0.7 * h1));
      efforts.chainQ(-r1, t, 0, 0);
      efforts.resetN(0);

      this.printCentralT('TS st-p', efforts);

      r1 = t * (1 - am + k2) / k5;
      r2 = -1 * r1 * a2 / k;
      efforts.transmitM(0, r2 * h1, 0, r2 * h);
      efforts.resetQ(-r2);
      efforts.resetN(0);

      this.printCentralT('TS st.vec', efforts);

      // stilpul intermediar, sarcina de la podul rulant din dreapta
      b7 = -3 * n9 * e8 * (1 - a ** 2) / k16;
      b8 = -3 * n8 * e8 * (1 - a ** 2) / k16;
      if (ns === 3) {
        b9 = 3 * n8 * e9 * (1 - am ** 2) / k6;
        b10 = 3 * n9 * e9 * (1 - am ** 2) / k6;
      } else {
        b9 = 3 * n8 * e9 * (1 - a ** 2) / k16;
        b10 = 3 * n9 * e9 * (1 - a ** 2) / k16;
      }
      b6 = b7 - (b7 + b9) * a2 / k;
      b = b8 - (b8 + b10) * a2 / k;

      // eforturile de la N-max din dreapta
      efforts.transmitM(0, b6 * h1, n9 * e8, b6 * h + n9 * e8);
      efforts.resetQ(-b6);
      efforts.chainN(0, 0, n9, 0);

      this.printCentralN('ND-max', efforts);

      // Calculul eforturilor de la actiunea ND-min
      efforts.transmitM(0, b * h1, n8 * e8, b * h + n8 * e8);
      efforts.resetQ(-b);
      efforts.chainN(0, 0, n8, 0);

      this.printCentralN('ND-min', efforts);

      // Forta T e aplicata la stilpul intermediar
      b9 = t1 * (1 - a + k4) / k15;
      r1 = b9 - b9 * a2 / k;
      m6 = r1 * 0.7 * h1;
      efforts.transmitM(0, r1 * h1 - t1 * (h1 - 0.7 * h1), 0, r1 * h - t1 * (h - 0.7 * h1));
      efforts.chainQ(-r1, t1, 0, 0);
      efforts.resetN(0);

      this.printCentralT('TD la st', efforts);

      if (ns === 3) {
        r1 = t1 * (1 - am + k2) / k5;
      } else {
        r1 = t1 * (1 - a + k4) / k15;
      }
      r2 = -r1 * a2 / k;
      efforts.transmitM(0, r2 * h1, 0, r2 * h);
      efforts.resetQ(-r2);
      efforts.resetN(0);

      this.printCentralT('TD s.vec', efforts);
    } else {
      // getting input values
      const {
        g1, s1, g2, g3, g4, g6,
        e7, w, w1, w2, n6, n7,
        t, e1, e2, e5, e6, k
      } = this.inputForm.value;

      // letting calculated values
      let hc: number;
      let ac: number;

      if (hsh) {
        h = h1 + h2;
        a = h1 / h;
        hc = h;
        ac = a;
        zc = z;
      } else {
        h = h1 + h2;
        a = h1 / h;
        hc = h1 + hic;
        ac = h1 / hc;
      }

      const k1 = (a ** 3) * (i2 / i1 - 1);
      const k2 = ((1 - a) ** 3) * i2 / i7 / 8 / z / z;
      let k3 = (ac ** 3) * (i4 / i3 - 1);
      let k4 = ((1 - ac) ** 3) * i4 / i8 / 8 / zc / zc;
      const k5 = 1 + k1 + k2;
      const k6 = k5 * 2 * h;
      const k7 = 3 * i2 / h / h / h / k5;
      const k8 = 3 * i4 / hc / hc / hc / (1 + k3 + k4);
      const k9 = 2 * k7 + (ns - 2) * k8;
      const a1 = k7 / k9;

      // stilpul marginal din stinga sarcina permanenta
      m5 = g1 * e1;
      m6 = g3 * e5 - (g1 + g4) * e2 - g2 * e7;
      b1 = (-3 * m5 * (1 + k1 / a) - 3 * m6 * (1 - a * a)) / k6;
      efforts.transmitM(m5, m5 + b1 * h1, m6, m5 + m6 + b1 * h);
      efforts.resetQ(-b1);
      efforts.chainN(g1, g4, g2 + g3, g6);

      this.printPermanent(efforts);

      // stilpul marginal sarcina de la zapada
      m5 = s1 * e1;
      m6 = -s1 * e2;
      b1 = (-3 * m5 * (1 + k1 / a) - 3 * m6 * (1 - a * a)) / k6;
      efforts.transmitM(m5, m5 + b1 * h1, m6, m5 + m6 + b1 * h);
      efforts.resetQ(-b1);
      efforts.resetN(s1);

      this.printSnow(efforts);

      // stilpul marginal, actiunea directa a vintului
      b2 = (-3 * w1 * h * (1 + a * k1 + 1.33 * (1 + a) * k2)) / 8 / k5;
      b3 = b2 * (w2 / w1);
      b1 = -w + b2 + b3;
      r1 = -b1 * a1 + b2;
      efforts.transmitM(0, r1 * h1 + 0.5 * w1 * (h1 ** 2), 0, r1 * h + 0.5 * w1 * h * h);
      efforts.transmitQ(-r1, -r1 - w1 * h1, 0, -r1 - w1 * h);
      efforts.resetN(0);

      this.printMarginalWind(efforts, 'direct');

      // stilpul marginal, actiunea indirecta a vintului
      r2 = -b1 * a1 + b3;
      efforts.transmitM(0, -r2 * h1 - 0.5 * w2 * h1 * h1, 0, -r2 * h - 0.5 * w2 * h * h);
      efforts.transmitQ(r2, r2 + w2 * h1, 0, r2 + w2 * h);
      efforts.resetN(0);

      this.printMarginalWind(efforts, 'direct');

      // stilpul marginal, actiunea sarcinii de la podul rulant
      b7 = (-3 * n7 * e5 * (1 - a * a)) / k6;
      b8 = (-3 * n6 * e5 * (1 - a * a)) / k6;
      if (ns === 2) {
        k4 = k2;
        k3 = k1;
      }
      b9 = 3 * n6 * e6 * (1 - ac * ac) / 2 / hc / (1 + k3 + k4);
      b10 = 3 * n7 * e6 * (1 - ac * ac) / 2 / hc / (1 + k3 + k4);
      b6 = b7 - (b7 + b9) * a1 / k;
      b = b8 - (b8 + b10) * a1 / k;

      // eforturile de N-max
      efforts.transmitM(0, b6 * h1, n7 * e5, b6 * h + n7 * e5);
      efforts.resetQ(-b6);
      efforts.chainN(0, 0, n7, 0);

      this.printMarginalN('N-max', efforts);

      // Calculul eforturilor de la actiunea N-min
      efforts.transmitM(0, b * h1, n6 * e5, b * h + n6 * e5);
      efforts.resetQ(-b);
      efforts.chainN(0, 0, n6, 0);

      this.printMarginalN('N-min', efforts);

      // Calculul eforturilor de la actiunea fortei T
      b9 = t * (1 - a + k2) / k5
      r1 = b9 - b9 * a1 / k;
      m5 = r1 * 0.7 * h1;
      efforts.transmitM(0, r1 * h1 - t * (h1 - 0.7 * h1), 0, r1 * h - t * (h - 0.7 * h1));
      efforts.chainQ(-r1, t, 0, 0);
      efforts.resetN(0);

      this.printMarginalT('T la st.', efforts);

      r1 = t * (1 - ac + k4) / (1 + k3 + k4);
      r2 = -r1 * a1 / k;
      efforts.transmitM(0, r2 * h1, 0, r2 * h);
      efforts.resetQ(-r2);
      efforts.resetN(0);

      this.printMarginalT('T st.vec', efforts);
    }

    this.mMaxType = c;
    this.mMax = m5;
  }

  private loadInput(): void {
    try {
      const value = localStorage.getItem('appConcrete2');
      const data = JSON.parse(value);
      this.inputForm.patchValue(data);
    } catch (e) {

    }
  }

  private saveInput() {
    const value = JSON.stringify(this.inputForm.value);
    localStorage.setItem('appConcrete2', value);
  }

  private print(name: string, coefficient: string, efforts: Efforts, multiplier?: number) {
    if (multiplier) {
      efforts.multiplyBy(multiplier);
    }
    this.result.push({
      efforts: Object.assign({}, efforts),
      coefficient,
      name
    });
  }

  private printPermanent(efforts: Efforts) {
    this.print('Permanentă', '1.0', efforts);
  }

  private printSnow(efforts: Efforts) {
    this.print('Zăpadă', '1.0', efforts);
    this.print('', '0.9', efforts, 0.9);
  }

  private printMarginalWind(efforts: Efforts, label: string) {
    this.print('Vânt', '1.0', efforts);
    this.print(label, '0.9', efforts, 0.9);
  }

  private printCentralWind(efforts: Efforts) {
    this.print('Vânt', '1.0', efforts);
    this.print('', '0.9', efforts, 0.9);
  }

  private printMarginalN(name: string, efforts: Efforts) {
    this.print(name, '1.0', efforts);
    this.print('la 0.85', '0.9', efforts, 0.9);
  }

  private printCentralN(name: string, efforts: Efforts) {
    this.print(name, '1.0', efforts);
    this.print('la 0.85', '0.9', efforts, 0.9);
    this.print(name, '1.0', efforts, 0.7 / 0.85 / 0.9);
    this.print('la 0.7', '0.9', efforts, 0.9);
  }

  private printMarginalT(name: string, efforts: Efforts) {
    this.print(name, '1.0', efforts);
    this.print('', '0.9', efforts, 0.9);
  }

  private printCentralT(name: string, efforts: Efforts) {
    this.print(name, '1.0', efforts);
    this.print('la 0.85', '0.9', efforts, 0.9);
  }
}
