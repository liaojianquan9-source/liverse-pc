<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    v-bind="$attrs"
  >
    <!-- Arrow Left -->
    <template v-if="name === 'arrow-left'">
      <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20.5 12H3.67004" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Arrow Right -->
    <template v-if="name === 'arrow-right'">
      <path d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3.5 12H20.33" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Arrow Down (chevron) -->
    <template v-if="name === 'arrow-down'">
      <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Location -->
    <template v-if="name === 'location'">
      <path d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z" />
      <path d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z" />
    </template>

    <!-- Coin (price) -->
    <template v-if="name === 'coin'">
      <path d="M18.5 12.6499V16.3499C18.5 19.4699 15.59 21.9999 12 21.9999C8.41 21.9999 5.5 19.4699 5.5 16.3499V12.6499C5.5 15.7699 8.41 17.9999 12 17.9999C15.59 17.9999 18.5 15.7699 18.5 12.6499Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18.5 7.65C18.5 8.56 18.25 9.4 17.81 10.12C16.74 11.88 14.54 13 12 13C9.46 13 7.26 11.88 6.19 10.12C5.75 9.4 5.5 8.56 5.5 7.65C5.5 6.09 6.22999 4.68 7.39999 3.66C8.57999 2.63 10.2 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18.5 7.65V12.65C18.5 15.77 15.59 18 12 18C8.41 18 5.5 15.77 5.5 12.65V7.65C5.5 4.53 8.41 2 12 2C13.8 2 15.42 2.63 16.6 3.65C17.77 4.68 18.5 6.09 18.5 7.65Z" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Heart (status) -->
    <template v-if="name === 'heart'">
      <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Calendar -->
    <template v-if="name === 'calendar'">
      <path d="M8 2V5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M16 2V5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3.5 9.08997H20.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.6947 13.7H15.7037" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.6947 16.7H15.7037" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.9955 13.7H12.0045" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.9955 16.7H12.0045" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.29431 13.7H8.30329" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.29431 16.7H8.30329" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Bus -->
    <template v-if="name === 'bus'">
      <path d="M16.9 22H7.10001C5.40001 22 4 20.61 4 18.9V5.10001C4 3.40001 5.39001 2 7.10001 2H16.9C18.6 2 20 3.39001 20 5.10001V18.9C20 20.61 18.61 22 16.9 22Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18.5 13H5.5C4.67 13 4 12.33 4 11.5V9.5C4 8.67 4.67 8 5.5 8H18.5C19.33 8 20 8.67 20 9.5V11.5C20 12.33 19.33 13 18.5 13Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.49451 17.7H8.50349" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.4945 17.7H15.5035" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9.5 5H14.5" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Car -->
    <template v-if="name === 'car'">
      <path d="M15.51 2.82996H8.49C6 2.82996 5.45 4.06996 5.13 5.58996L4 11H20L18.87 5.58996C18.55 4.06996 18 2.82996 15.51 2.82996Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21.99 19.82C22.1 20.99 21.16 22 19.96 22H18.08C17 22 16.85 21.54 16.66 20.97L16.46 20.37C16.18 19.55 16 19 14.56 19H9.43998C7.99998 19 7.78998 19.62 7.53998 20.37L7.33998 20.97C7.14998 21.54 6.99998 22 5.91998 22H4.03998C2.83998 22 1.89998 20.99 2.00998 19.82L2.56998 13.73C2.70998 12.23 2.99998 11 5.61998 11H18.38C21 11 21.29 12.23 21.43 13.73L21.99 19.82Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4 8H3" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21 8H20" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 3V5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.5 5H13.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 15H9" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15 15H18" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Call (phone) -->
    <template v-if="name === 'call'">
      <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke-miterlimit="10" />
    </template>

    <!-- Document (file) -->
    <template v-if="name === 'document'">
      <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15 2V9.86C15 10.2 14.81 10.53 14.51 10.69L12.13 11.97C12.05 12.01 11.95 12.01 11.87 11.97L9.49 10.69C9.19 10.53 9 10.2 9 9.86V2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7 16H17" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9 12H15" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Close Circle -->
    <template v-if="name === 'close-circle'">
      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9.16998 14.83L14.83 9.17004" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14.83 14.83L9.16998 9.17004" stroke-linecap="round" stroke-linejoin="round" />
    </template>

    <!-- Subway (保留原始路径，mx-icons 无直接对应) -->
    <template v-if="name === 'subway'">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  strokeWidth: { type: [Number, String], default: 1.5 }
})
</script>
