import { computed, ComputedRef } from 'vue';
import {
  Car, DriveType, SettingsForm, TransmissionUpgrade,
} from './types';

const finalRatio = [
  TransmissionUpgrade.sport,
  TransmissionUpgrade.race,
  TransmissionUpgrade.raceSix,
  TransmissionUpgrade.raceSeven,
  TransmissionUpgrade.raceEight,
  TransmissionUpgrade.raceNine,
  TransmissionUpgrade.raceTen,
];

// const gearRatios = [
//   TransmissionUpgrade.race,
//   TransmissionUpgrade.raceSix,
//   TransmissionUpgrade.raceSeven,
//   TransmissionUpgrade.raceEight,
//   TransmissionUpgrade.raceNine,
//   TransmissionUpgrade.raceTen,
// ];

// const gearCounts: Record<string, number> = {
//   [TransmissionUpgrade.race]: 6,
//   [TransmissionUpgrade.raceSix]: 6,
//   [TransmissionUpgrade.raceSeven]: 7,
//   [TransmissionUpgrade.raceEight]: 8,
//   [TransmissionUpgrade.raceNine]: 9,
//   [TransmissionUpgrade.raceTen]: 10,
// };

// const springs = [
//   FullUpgrade.race,
//   FullUpgrade.rally,
//   FullUpgrade.drift,
//   FullUpgrade.offroad,
// ];

export interface UseUpgrades {
  gears: {
    final: boolean;
    count: number;
  };
  diff: {
    front: boolean;
    rear: boolean;
    center: boolean;
  };
}

function getGearCount(form: SettingsForm, car: ComputedRef<Car | null>): number {
  // if (gearRatios.includes(form.build.drivetrain.transmission)) {
  //   return gearCounts[form.build.drivetrain.transmission];
  // }
  return 10; // Always return 10 for now, as a car might have 10 tunable gears with its stock transmission
}

// function hasAdjustableFrontAero(form: SettingsForm, car: ComputedRef<Car | null>): boolean {
//   if (form.build.aeroAndAppearance.rearWing === 'Forza') return true;
//   return false;
// }

export default function useUpgrades(form: SettingsForm, car: ComputedRef<Car | null>, driveType: ComputedRef<DriveType>) {
  const enabled = computed<UseUpgrades>(() => ({
    gears: {
      final: finalRatio.includes(form.build.drivetrain.transmission),
      count: getGearCount(form, car),
    },
    diff: {
      front: [DriveType.awd, DriveType.fwd].includes(driveType.value),
      rear: [DriveType.awd, DriveType.rwd].includes(driveType.value),
      center: DriveType.awd === driveType.value,
      stock: driveType.value,
    },
  }));
  return enabled;
}
