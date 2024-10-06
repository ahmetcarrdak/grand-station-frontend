# Grand Station Frontend

Grand Station, kullanıcıların anlık verileri takip etmelerini sağlayan bir uygulamadır. Bu proje, React ve ASP.NET kullanılarak geliştirilmiştir.

## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Geliştirme](#geliştirme)
- [Test](#test)
- [npm İşlemleri](#npm-i̇şlemleri)
- [Bağımlılıklar](#bağımlılıklar)
- [Lisans](#lisans)

## Özellikler

- Gerçek zamanlı veri güncellemeleri
- Çoklu dil desteği
- CSV verisi oluşturma ve indirme
- Kullanıcı dostu arayüz

## Kurulum

### Gereksinimler

- Node.js (v14 veya üstü)
- .NET SDK (v6 veya üstü)

### Adımlar

1. **Projeyi Klonlayın**

   ```bash
   git clone https://github.com/kullaniciadi/grand-station-frontend.git
   cd grand-station-frontend
   ```

2. **Bağımlılıkları Yükleyin**

   ```bash
   npm install
   ```

3. **Sunucuyu Başlatın**

   - **React Uygulaması:**

     ```bash
     npm start
     ```

   - **.NET Sunucusu:**

     Projeyi ayrı bir dizinde barındırıyorsanız, ilgili .NET projesini başlatmak için:

     ```bash
     cd ../grand-station-backend
     dotnet run
     ```

## Kullanım

Uygulama, tarayıcınızda `http://localhost:3000` adresinde açılacaktır. Anlık veri güncellemeleri ve diğer özellikler için arayüzü kullanabilirsiniz.

## Geliştirme

- **Yeni Özellik Eklemek İçin**: Yeni bir dal oluşturun ve özelliklerinizi geliştirin. Daha sonra ana dal ile birleştirin.

  ```bash
  git checkout -b yeni-ozellik
  # Değişikliklerinizi yapın
  git add .
  git commit -m "Yeni özellik eklendi"
  git checkout main
  git merge yeni-ozellik
  ```

- **Daha Fazla Bilgi**: Projenin mimarisi ve bileşen yapısı hakkında bilgi almak için [Dökümantasyon](DOKUMANTASYON_LINKI)'na bakın.

## Test

Proje testlerini çalıştırmak için:

```bash
npm test
```

## npm İşlemleri

Aşağıdaki `npm` komutları, projenizle ilgili yaygın işlemleri gerçekleştirmenize yardımcı olacaktır:

- **Bağımlılıkları Yüklemek için**:

  ```bash
  npm install
  ```

- **Yeni Bir Bağımlılık Eklemek için**:

  ```bash
  npm install <paket_adi>
  ```

- **Bir Bağımlılığı Kaldırmak için**:

  ```bash
  npm uninstall <paket_adi>
  ```

- **Projeyi Oluşturmak için**:

  ```bash
  npm run build
  ```

- **Statik Dosyaları Sunmak için**:

  ```bash
  npm run serve
  ```

## Bağımlılıklar

Projeniz için gerekli olan bağımlılıklar şunlardır:

- `@testing-library/jest-dom`: 5.17.0
- `@testing-library/react`: 13.4.0
- `@testing-library/user-event`: 13.5.0
- `@types/jest`: 27.5.2
- `@types/node`: 16.18.111
- `@types/react-csv`: 1.1.10
- `@types/react-dom`: 18.3.0
- `@types/react`: 18.3.9
- `axios`: 1.7.7
- `i18next-http-backend`: 2.6.1
- `i18next`: 23.15.1
- `jspdf-autotable`: 3.8.3
- `jspdf`: 2.5.2
- `react-csv`: 2.2.2
- `react-data-table-component`: 7.6.2
- `react-dom`: 18.3.1
- `react-i18next`: 15.0.2
- `react-icons`: 5.3.0
- `react-router-dom`: 6.26.2
- `react-scripts`: 5.0.1
- `react`: 18.3.1
- `typescript`: 4.9.5
- `web-vitals`: 2.1.4

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
