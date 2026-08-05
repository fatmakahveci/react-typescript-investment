# Yatırım Hesaplayıcı Kullanıcı Rehberi

Bu hesaplayıcı, birikiminizin belirlediğiniz süre boyunca nasıl değişebileceğini yıl yıl görmenizi sağlar. Başlangıç birikiminizi, her yıl ekleyeceğiniz tutarı ve tahmini getiri oranını girmeniz yeterlidir.

> Bu araç yalnızca tahmini bir projeksiyon sunar. Sonuçlar garanti edilmiş getiri veya finansal danışmanlık değildir. Vergi, ücret, enflasyon ve piyasa dalgalanmaları hesaplamaya dahil değildir.

## Hızlı başlangıç

1. Kullanmak istediğiniz **Currency** seçeneğini belirleyin.
2. **Current Savings** alanına bugün sahip olduğunuz başlangıç birikimini yazın.
3. Katkıyı aylık veya yıllık yapacağınızı seçip katkı tutarını girin.
4. Beklediğiniz yıllık getiri oranını ve aylık/yıllık bileşik sıklığını seçin.
5. Tahmini yıllık enflasyonu ve yatırım süresini girin.
6. **Calculate projection** düğmesine basın.

Sonuçlar, her yatırım yılı için ayrı bir satır halinde gösterilir. Yeni bir hesaplama yapmak için değerleri değiştirip düğmeye yeniden basabilirsiniz. Formu ve mevcut sonucu temizlemek için **Reset** düğmesini kullanın.

## Alanlar ne anlama geliyor?

| Alan | Açıklama | Kabul edilen değer |
| --- | --- | --- |
| Currency | Sonuçlarda kullanılan para birimi | USD, EUR, GBP veya TRY |
| Current Savings ($) | Hesaplamanın başladığı mevcut birikim | `0` veya daha büyük |
| Contribution Frequency | Katkının aylık mı yıllık mı yatırıldığı | Monthly veya Yearly |
| Contribution | Seçilen dönemin sonunda yatırılan tutar | `0` veya daha büyük |
| Expected Return (%, yearly) | Tahmini yıllık nominal getiri ya da kayıp | `-100` ile `100` arası |
| Compounding Frequency | Getirinin aylık veya yıllık bileşiklenmesi | Monthly veya Yearly |
| Expected Inflation | Satın alma gücü hesabında kullanılan oran | `0` ile `100` arası |
| Investment Duration (years) | Projeksiyonun kapsadığı yıl sayısı | `1`–`100` arasında tam sayı |

Ondalıklı para ve faiz değerleri kullanabilirsiniz. Örneğin `1250.50` veya `6.75`. Yatırım süresi ise tam sayı olmalıdır.

## Sonuç tablosunu okumak

- **Year:** Yatırımın kaçıncı yılı olduğu.
- **Total Savings:** Yıl sonundaki tahmini toplam bakiye.
- **Interest (Year):** Yalnızca o yıl kazanılan veya kaybedilen tutar.
- **Total Interest:** Başlangıçtan ilgili yıla kadar biriken toplam getiri veya kayıp.
- **Invested Capital:** Başlangıç birikimi ve o tarihe kadar yaptığınız katkıların toplamı.
- **Today's Money:** Nominal bakiyenin tahmini enflasyona göre bugünkü satın alma gücü.

Tablonun üzerinde son yılın temel değerlerini gösteren özet kartları, altında ise nominal bakiye, yatırılan sermaye ve enflasyona göre düzeltilmiş bakiyeyi karşılaştıran büyüme grafiği bulunur.

Küçük ekranlarda tablonun tamamını görmek için tabloyu yatay kaydırabilirsiniz. Yıl kolonu, hangi satırda olduğunuzu takip edebilmeniz için sabit kalır.

## Örnek hesaplama

Aşağıdaki değerleri kullanalım:

- Başlangıç birikimi: `$10,000`
- Yıllık katkı: `$2,400`
- Katkı sıklığı: `Yearly`
- Beklenen yıllık getiri: `%7`
- Bileşik sıklığı: `Yearly`
- Enflasyon: `%0`
- Süre: `10 yıl`

Bu varsayımlarla 10. yılın sonunda:

- Tahmini toplam bakiye: **$52,830.99**
- Toplam yatırılan sermaye: **$34,000.00**
- Tahmini toplam getiri: **$18,830.99**

Bu örnek, her yıl aynı getiri oranının gerçekleştiğini varsayar. Gerçek yatırımlarda yıllık getiriler değişebilir.

## Hesaplama yöntemi

Her dönem için hesaplama şu sırayla yapılır:

1. Dönem başındaki bakiyeye aylık veya yıllık dönem oranı uygulanır.
2. Hesaplanan getiri bakiyeye eklenir.
3. Katkı, seçilen katkı döneminin sonunda bakiyeye eklenir.

Bu nedenle yeni eklenen katkı, bir sonraki bileşik döneminden itibaren getiri kazanmaya başlar. Enflasyona göre düzeltilmiş değer, ilgili yılın nominal bakiyesinin beklenen enflasyonla bugünkü satın alma gücüne çevrilmesiyle bulunur.

Basitleştirilmiş formül:

```text
Yıllık getiri = Yıl başı bakiyesi × Getiri oranı
Yıl sonu bakiyesi = Yıl başı bakiyesi + Yıllık getiri + Yıllık katkı
```

## Hata mesajları

Bir değer kabul edilen aralığın dışındaysa ilgili alanın altında açıklayıcı bir hata gösterilir:

- Birikim ve yıllık katkı negatif olamaz.
- Getiri oranı `%−100` ile `%100` arasında olmalıdır.
- Süre `1` ile `100` arasında bir tam sayı olmalıdır.
- Tüm alanlar doldurulmalıdır.

Değeri düzelttikten sonra **Calculate projection** düğmesine yeniden basın.

## Gizlilik ve güvenlik

Girdiğiniz finansal değerler yalnızca tarayıcınızda hesaplanır. Uygulama bu bilgileri bir sunucuya göndermez veya saklamaz. Sayfayı yenilediğinizde ya da **Reset** düğmesine bastığınızda mevcut hesaplama temizlenir.

## Erişilebilirlik

Uygulama klavye ile kullanılabilir. Alanlar arasında `Tab` ile ilerleyebilir, düğmeleri `Enter` veya `Space` ile çalıştırabilirsiniz. Hata mesajları ekran okuyuculara bildirilir ve arayüz mobil, tablet ve masaüstü ekranlara uyum sağlar.
