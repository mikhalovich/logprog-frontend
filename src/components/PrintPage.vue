<template>
  <div :class="`print-page--${isClient ? 'client' : 'carrier'}`">
    <div class="details">
      <div class="details__company">
        <h3>Клиент:</h3>
        <p v-if="isClient" class="details__company-name">{{ order.client.name }}</p>
        <p v-if="isClient" v-html="order.client.details" class="details__company-details"></p>
        <p v-if="!isClient" class="details__company-name">{{ company.name }}</p>
        <p v-if="!isClient" v-html="company.details" class="details__company-details"></p>
      </div>
      <div class="details__company">
        <h3>Перевозчик:</h3>
        <p class="details__company-name">{{ order.carrier.name }}</p>
        <p v-html="order.carrier.details" class="details__company-details"></p>
      </div>
    </div>

    <div class="order-preambula">
      <p>Поручение перевозчику (заявка) №{{ order.orderNumber }} от {{ order.orderCreateDate }}</p>
      <p>к договору транспортной перевозки {{ order.carrier.agreement }}</p>
    </div>
    <div>
      <p>Настоящее ПЗ является протоколом согласования цены. ПЗ принятое и подписанное по электронной почте имеет юридическую силу.</p>
    </div>
    <div class="table">
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Подвижной состав, владелец Т/С</div>
        <div class="table__cell table__cell--second-column">
          <p>{{ order.carrier.name }}</p>
          <p>Авто {{ order.truck.mark }} {{ order.truck.registrationNumber }}, п/п {{ order.trailer.mark }} {{ order.trailer.registrationNumber }}</p>
        </div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Водитель, No паспорта, телефоны</div>
        <div class="table__cell table__cell--second-column">
          <p>{{ order.driver.driverName }}</p>
          <p>{{ order.driver.driverPassport }}</p>
          <p>{{ order.driver.driverContacts }}</p>
        </div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Дата и время загрузки</div>
        <div class="table__cell table__cell--second-column">{{ order.shipmentDate[0] }}</div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Наименование груза, вес, объем</div>
        <div class="table__cell table__cell--second-column">{{ order.cargo }}</div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Адрес загрузки</div>
        <div class="table__cell table__cell--second-column">{{ order.fromPoint }}</div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Срок доставки</div>
        <div class="table__cell table__cell--second-column">{{ order.shipmentDate[1] }}</div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Адрес разгрузки</div>
        <div class="table__cell table__cell--second-column">{{ order.toPoint }}</div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Ставка и условия оплаты</div>
        <div class="table__cell table__cell--second-column">{{  }} RUB, в том числе НДС 0%, согласно пп. 1.1.1., ст. 102, гл. 12, раздела V Налогового кодекса РБ (Особенная часть) и пп. 2.1 п. 1 ст. 164 НК РФ.
Срок оплаты – 10 (десяти) банковских дней по факту выгрузки авто по электронным копиям счет - фактуры и акта выполненных работ. С последующим предоставлением оригиналов счета, акта, c приложением оригиналов CMR.
2. Клиент несет ответственность за просрочку оплаты перевозки в размере 0,1 % от неоплаченной суммы за каждый день просрочки.
3. Банковская комиссия относится на счет отправителя платежа.</div>
      </div>
      <div class="table__row">
        <div class="table__cell table__cell--first-column">Прочие условия</div>
        <div class="table__cell table__cell--second-column">1. Водитель в обязательном порядке должен иметь действующий санитарный паспорт на автомобиль, разрешающий перевозку пищевых продуктов, с отметкой о дезинфекции перед отгрузкой не более 48 часов перед загрузкой.
2. Водитель обязан следить за правильностью погрузки, распределением груза по осям, креплением груза и количеством товара, при необходимости измерять температуру продукции при загрузке, поддерживать указанную отправителем температуру в пути следования.
3. Погранпереход по указанию отправителя</div>
      </div>
    </div>
    <div class="order-epilogue">
      Перевозка осуществляется согласно условиям настоящего Поручения перевозчику(заявка) и Договора {{ order.carrier.agreement }}
    </div>
    <div class="signs">
      <div class="signs__client">
        <p class="signs__name">Клиент: {{ company.name }}</p>
        <img class="signs__client-stamp" src="../assets/stamp.png">
        <img class="signs__client-sign" src="../assets/sign.png">
        <p>{{ company.post }} _________  {{ company.signsName }}</p>
      </div>
      <div>
        <p class="signs__name">Перевозчик (Экспедитор): {{ order.carrier.name }}</p>
        <p>{{ order.carrier.post }} ________ {{ order.carrier.signsName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'print-page',
  props: {
    isClient: Boolean
  },

  computed: {
    ...mapState({
      order: state => state.orders.order,
      company: state => state.companies.company
    })
  }
};
</script>

<style>
#orderPrintForm p {
  margin-bottom: 0;
}
.details {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}

.details .details__company {
    width: 50%;
    padding: 25px;
}

.order-preambula {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.order-epilogue {
  margin-bottom: 50px;
}

.table .table__row {
  display: flex;
}

.table .table__cell {
  border: 0.5px solid;
  padding: 2px 10px;
}

.table .table__cell.table__cell--first-column {
  width: 45%;
}

.table .table__cell.table__cell--second-column {
  width: 100%;
}

.table .table__cell {
  border: 0.5px solid;
  padding: 2px 10px;
}

.table {
  border: 0.5px solid;
  margin-bottom: 10px;
}

.signs {
  display: flex;
  justify-content: space-around;
}

#orderPrintForm p.signs__name {
  margin-bottom: 30px;
}
</style>
