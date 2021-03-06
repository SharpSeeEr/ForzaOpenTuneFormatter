<script setup lang="ts">
import { computed } from 'vue';
import { addSuffix } from '../lib/utils';
import { useFormattingForm } from '../lib/useFormattingForm';
import { PressureUnit } from '../lib/types';
import NumberInput from './NumberInput.vue';
import UnitSelect from './UnitSelect.vue';
import CheckboxControl from './CheckboxControl.vue';

const { form, show } = useFormattingForm();

const gears = computed(() => form.tune.gears.ratios.slice(1, show.value.gears.count + 1));

const tirePressureStep = computed(() => (form.tune.tires.units === PressureUnit.bar ? '0.01' : '0.1'));
</script>

<template>
  <section>
    <h2>Tuning</h2>
    <p>
      This section is for tuning.
      <br>If you leave something stock (Ex. brakes), or leave the default
      settings for a category, you should still put in the stock value.
    </p>
  </section>

  <section>
    <h2>Tires</h2>
    <div class="row">
      <NumberInput
        v-model="form.tune.tires.front"
        label="Front"
        required
        min="0.0"
        :step="tirePressureStep"
      />
      <NumberInput
        v-model="form.tune.tires.rear"
        label="Rear"
        required
        min="0.0"
        :step="tirePressureStep"
      />
      <UnitSelect
        v-model="form.tune.tires.units"
        label="Units"
        type="pressure"
      />
    </div>
  </section>

  <section>
    <h2>Gearing</h2>
    <CheckboxControl v-model="form.tune.gears.na" label="Not Applicable" />
    <NumberInput
      v-model="form.tune.gears.ratios[0]"
      :disabled="form.tune.gears.na"
      label="Final Drive"
      min="0.0"
      step="0.01"
    />
    <div class="gears-grid">
      <NumberInput
        v-for="(_, index) in gears"
        :key="index"
        v-model="form.tune.gears.ratios[index + 1]"
        :disabled="form.tune.gears.na"
        :label="`${index + 1}${addSuffix(index + 1)}`"
        min="0"
        step="0.01"
      />
    </div>
  </section>

  <section>
    <h2>Alignment</h2>
    <h3>Camber</h3>
    <div class="row">
      <NumberInput
        v-model="form.tune.camber.front"
        label="Front"
        required
        min="-10"
        step="0.1"
      />
      <NumberInput
        v-model="form.tune.camber.rear"
        label="Rear"
        required
        min="-10"
        step="0.1"
      />
    </div>
    <h3>Toe</h3>
    <div class="row">
      <NumberInput
        v-model="form.tune.toe.front"
        label="Front"
        required
        min="-10"
        step="0.1"
      />
      <NumberInput
        v-model="form.tune.toe.rear"
        label="Rear"
        required
        min="-10"
        step="0.1"
      />
    </div>
    <h3>Front Caster</h3>
    <div class="row">
      <NumberInput
        v-model="form.tune.caster"
        label="Angle"
        required
        max="7"
        step="0.1"
      />
    </div>
  </section>

  <section>
    <h2>Antiroll Bars</h2>
    <CheckboxControl v-model="form.tune.arb.na" label="Not Applicable" />
    <div class="row">
      <NumberInput
        v-model="form.tune.arb.front"
        label="Front"
        min="0.0"
        step="0.1"
      />
      <NumberInput
        v-model="form.tune.arb.rear"
        label="Rear"
        min="0.0"
        step="0.1"
      />
    </div>
  </section>

  <section>
    <h2>Springs</h2>
    <CheckboxControl v-model="form.tune.springs.na" label="Not Applicable" />
    <h3>Tension</h3>
    <div class="row">
      <NumberInput
        v-model="form.tune.springs.front"
        label="Front"
        min="0.0"
        step="1"
      />
      <NumberInput
        v-model="form.tune.springs.rear"
        label="Rear"
        min="0.0"
        step="1"
      />
      <UnitSelect
        v-model="form.tune.springs.units"
        label="Units"
        type="springrate"
      />
    </div>
    <h3>Ride Height</h3>
    <div class="row">
      <NumberInput
        v-model="form.tune.rideHeight.front"
        label="Front"
        min="0.0"
        step="0.1"
      />
      <NumberInput
        v-model="form.tune.rideHeight.rear"
        label="Rear"
        min="0.0"
        step="0.1"
      />
      <UnitSelect
        v-model="form.tune.rideHeight.units"
        label="Units"
        type="height"
      />
    </div>
  </section>
  <section>
    <h2>Damping</h2>
    <CheckboxControl v-model="form.tune.damping.na" label="Not Applicable" />
    <h3>Rebound Stiffness</h3>
    <div class="row">
      <NumberInput
        v-model="form.tune.damping.front"
        label="Front"
        min="0.0"
        step="0.1"
      />
      <NumberInput
        v-model="form.tune.damping.rear"
        label="Rear"
        min="0.0"
        step="0.1"
      />
    </div>
    <h3>Bump Stiffness</h3>
    <div class="row">
      <NumberInput
        v-model="form.tune.bump.front"
        label="Front"
        min="0.0"
        step="0.1"
      />
      <NumberInput
        v-model="form.tune.bump.rear"
        label="Rear"
        min="0.0"
        step="0.1"
      />
    </div>
  </section>

  <section>
    <h2>Aero Downforce</h2>
    <CheckboxControl v-model="form.tune.aero.na" label="Not Applicable" />
    <div class="row">
      <NumberInput
        v-model="form.tune.aero.front"
        label="Front"
        min="0"
        step="1"
      />
      <NumberInput
        v-model="form.tune.aero.rear"
        label="Rear"
        min="0"
        step="1"
      />
      <UnitSelect
        v-model="form.tune.aero.units"
        label="Units"
        type="force"
      />
    </div>
  </section>

  <section>
    <h2>Brakes</h2>
    <CheckboxControl v-model="form.tune.brake.na" label="Not Applicable" />
    <div class="row">
      <NumberInput
        v-model="form.tune.brake.bias"
        label="Balance"
        min="0"
        max="100"
        step="1"
      />
      <NumberInput
        v-model="form.tune.brake.pressure"
        label="Pressure"
        min="0"
        max="200"
        step="1"
      />
    </div>
  </section>

  <section>
    <h2>Differential</h2>
    <CheckboxControl v-model="form.tune.diff.na" label="Not Applicable" />
    <template v-if="show.diff.front">
      <h3>Front</h3>
      <div class="row">
        <NumberInput
          v-model="form.tune.diff.front.accel"
          label="Acceleration"
          min="0"
          max="100"
          step="1"
        />
        <NumberInput
          v-model="form.tune.diff.front.decel"
          label="Deceleration"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </template>
    <template v-if="show.diff.rear">
      <h3>Rear</h3>
      <div class="row">
        <NumberInput
          v-model="form.tune.diff.rear.accel"
          label="Acceleration"
          min="0"
          max="100"
          step="1"
        />
        <NumberInput
          v-model="form.tune.diff.rear.decel"
          label="Deceleration"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </template>
    <template v-if="show.diff.center">
      <h3>Center</h3>
      <div class="row">
        <NumberInput
          v-model="form.tune.diff.center"
          label="Balance"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </template>
  </section>
</template>
