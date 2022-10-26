<template>
  <v-container>
    <v-col cols="4">
      <OrderForm @save-data="save" />
    </v-col>
    <!-- <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Печать </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Печать заявки</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="print">Печать</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col>
              <p>Заказчик:</p>
              <p>{{ order.customer.name }}</p>
              <p>{{ order.customer.details }}</p>
            </v-col>
            <v-col>
              <p>Исполнитель:</p>
              <p>"ООО ЭмАйТех"</p>
              <p>
                {{
                  `УНП 591037980
              Юр.адрес : Республика Беларусь, 231005, г. Гродно, ул. Гаспадарчая 21А, оф. 107
              Почтовый адрес: 231005, г. Гродно, ул. Гаспадарчая, 21А, оф. 107
              в ЗАО «Альфа-банк»  г. Минск, ул. Сурганова, 43-37
              Р\С BY02ALFA30122A62070020270000(RUB)
              BIC ALFABY2X
              Счет ЗАО «Альфа-Банк» №30111810100000000221 в АО «Альфа-Банк», Москва, РФ
              Банк АО «Альфа-Банк», Москва SWIFT ALFARUMM
              к\с 30101810200000000593
              БИК 044525593 ИНН 7728168971

              Тел.моб.+37529 2837757 (Viber, Whatsapp)
              e-mail info.mitech@yandex.com`
                }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <p>
              Поручение перевозчику (заявка) № {{ order.orderNumber }} от
              {{ order.orderCreateDate }}
            </p>
            <p>
              к договору транспортной перевозки № {{ order.carrier.agreement }}
            </p>
          </v-row>
          <v-row>
            Настоящее ПЗ является протоколом согласования цены. ПЗ принятое и
            подписанное по электронной почте имеет юридическую силу.
          </v-row>
          <div>
            <v-row>
              <v-col>Подвижной состав, владелец Т/С</v-col>
              <v-col>
                <p>Владелец автомобиля {{ order.carrier.name }}</p>
                <p>
                  Авто {{ order.truck.truck }}
                  {{ order.truck.registrationNumber }} /
                  {{ order.trailer.trailer }}
                  {{ order.trailer.registrationNumber }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>Водитель, № паспорта, телефоны</v-col>
              <v-col>
                <p>{{ order.driver.driverName }}</p>
                <p>{{ order.driver.driverPassport }}</p>
                <p>{{ order.driver.driverContacts }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>Дата и время загрузки</v-col>
              <v-col>{{ order.shipmentDate[0] }}</v-col>
            </v-row>
            <v-row>
              <v-col>Наименование груза, вес, объем</v-col>
              <v-col>{{ order.cargo }}</v-col>
            </v-row>
            <v-row>
              <v-col>Адрес загрузки</v-col>
              <v-col>{{ order.fromPoint }}</v-col>
            </v-row>
            <v-row>
              <v-col>Срок доставки</v-col>
              <v-col>{{ order.shipmentDate[1] }}</v-col>
            </v-row>
            <v-row>
              <v-col>Адрес разгрузки</v-col>
              <v-col>{{ order.toPoint }}</v-col>
            </v-row>
            <v-row>
              <v-col>Ставка и условия оплаты</v-col>
              <v-col>
                <p>
                  {{ order.clientPrice }} {{ order.currency }}, в том числе
                  НДС 0%, согласно пп. 1.1.1., ст. 102, гл. 12, раздела V
                  Налогового кодекса РБ (Особенная часть) и пп. 2.1 п. 1 ст. 164
                  НК РФ. Срок оплаты – 10 (десять) банковских дней по факту
                  выгрузки авто по электронным копиям счет - фактуры и акта
                  выполненных работ. С последующим предоставлением оригиналов
                  счета, акта, c приложением оригиналов CMR. 2. Клиент несет
                  ответственность за просрочку оплаты перевозки в размере 0,1 %
                  от неоплаченной суммы за каждый день просрочки. 3. Банковская
                  комиссия относится на счет отправителя платежа.
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>Прочие условия</v-col>
              <v-col
                >1. Водитель в обязательном порядке должен иметь действующий
                санитарный паспорт на автомобиль, разрешающий перевозку пищевых
                продуктов, с отметкой о дезинфекции перед отгрузкой не более 48
                часов перед загрузкой. 2. Водитель обязан следить за
                правильностью погрузки, распределением груза по осям, креплением
                груза и количеством товара, при необходимости измерять
                температуру продукции при загрузке, поддерживать указанную
                отправителем температуру в пути следования. 3. Погранпереход по
                указанию отправителя
              </v-col>
            </v-row>
            <v-row>
              <p>
                Перевозка осуществляется согласно условиям настоящего Поручения
                перевозчику(заявка) и Договора № {{ order.carrier.agreement }}.
              </p>
            </v-row>
            <v-row>
              <v-col>
                <p>Клиент: {{ order.customer.name }}</p>
              </v-col>
              <v-col>
                <p>Исполнитель: "ООО ЭмАйТех"</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>
                  {{ order.customer.post }} ________
                  {{ order.customer.signsName }}
                </p>
              </v-col>
              <v-col>
                <p>Директор ________ Е.Р. Михалович</p>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script>
import OrderForm from '@/components/OrderForm.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    OrderForm
  },

  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
  },

  created () {
    this.fetchOrder(this.$route.params.id);
  },

  methods: {
    ...mapActions('orders', ['updateOrder', 'fetchOrder']),

    save (order) {
      this.updateOrder({ order: order, orderId: this.$route.params.id });
    },

    print () {
      console.log();
    }
  }
};
</script>

<style></style>
