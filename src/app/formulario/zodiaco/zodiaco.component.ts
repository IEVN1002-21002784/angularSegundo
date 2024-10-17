import { Component} from '@angular/core';
import { FormBuilder,FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  templateUrl: './zodiaco.component.html',
  imports:[ReactiveFormsModule],
  styles: ``
})
export default class ZodiacoComponent {
  formGroup!:FormGroup;
  nombreCompleto: string = '';
  fano: number = 2024;
  edad: number = 0;
  signo: string = '';
  url = ''; 
 
  constructor(private fb:FormBuilder){}
  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      apaterno:[''],
      amaterno:[''],
      dia:[''],
      mes:[''],
      anio:[''],
      sexo:[''],
    })

  }
  ngOnInit(): void {
    this.formGroup = this.initForm();
}
  onSubmit():void{
    const { nombre, apaterno, amaterno, anio,dia,mes } =  this.formGroup.value;
    this.nombreCompleto = `${nombre} ${apaterno} ${amaterno}`;
    console.log(anio);
    this.edad = this.fano - anio;
    if (10 <  mes ||
       (10 === mes && 16 < dia)) {
        this.edad--; 
       }
    this.calcularSigno(anio);
  }

  calcularSigno(anio: number): void {
    const signos = {
      "Rata": {
        years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020],
        url: 'https://elcomercio.pe/resizer/ouhyJzBv_HxkbRRx1UP56uCyLsg=/1200x900/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/VUKSU3CECFA6RILNQZYIO35ZHY.jpg'
      },
      "Buey": {
        years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021],
        url: 'https://peopleenespanol.com/thmb/9yOzS_4WbqBfxAQOlPwffgt4d8c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165942187-2000-f810031b206d4fa7b64e5f8ad9f2bedd.jpg'
      },
      "Tigre": {
        years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022],
        url: 'https://okdiario.com/img/2021/01/15/tigre-horoscopo-chino.jpg'
      },
      "Conejo": {
        years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023],
        url: 'https://peopleenespanol.com/thmb/-ekXDGhFH6Baw6C29OGuDxf8iDQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165927323-2000-c6361314aab74b7485a5ea677666ba83.jpg'
      },
      "Dragón": {
        years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024],
        url: 'https://elcomercio.pe/resizer/xxsN__44AHaor2vvb-A5wlkoubw=/620x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/DRPAZEHXHFG6PJBGTV5OQJTT6U.jpg'
      },
      "Serpiente": {
        years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025],
        url: 'https://peopleenespanol.com/thmb/Who-b06dJwjtqnuJ406zgMaq4kg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165965553-2000-e4700b87c9fd404681a502f7095c2ac5.jpg'
      },
      "Caballo": {
        years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026],
        url: 'https://peopleenespanol.com/thmb/NmX4UUt1APhp__iVTPZtQJim9t8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165967001-2000-57bb5c0eac9247e4a6b9afe14505f364.jpg'
      },
      "Cabra": {
        years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027],
        url: 'https://peopleenespanol.com/thmb/Fwy99mIonHJYbhmA9AOTeWCpkdU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165967741-2000-12afb4d370f14afe856f05ba36fe1693.jpg'
      },
      "Mono": {
        years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028],
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR36Cr-dEF7FIwGIw75wLfOweuMcIJSKMahSA&s'
      },
      "Gallo": {
        years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029],
        url: 'https://peopleenespanol.com/thmb/Th2wLXhS9Tzh3VR7DtVB9CwgUFE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165926089-2000-25a52aba2d0942679de98ba836f1ab9f.jpg'
      },
      "Perro": {
        years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030],
        url: 'https://studycli.org/wp-content/uploads/2021/06/chinese-new-year-year-of-the-dog-paper-cutting.jpeg'
      },
      "Cerdo": {
        years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019],
        url: 'https://peopleenespanol.com/thmb/3_4ezJWMT8DtQSEuV5vMg3X8DUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Horoscopo-chino-165969332-2000-eea5e27d3f4145c9b01121f4c61ccaef.jpg'
      }
    };
    for (const [key, data] of Object.entries(signos)) {
      if (data.years.includes(anio)) {
        this.signo = key;
        this.url = data.url;
        break;
      }
    }
  }
  
}
