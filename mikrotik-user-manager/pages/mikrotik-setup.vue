<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connect to Mikrotik Server
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleConnect">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="hostname" class="sr-only">Hostname</label>
            <input
              id="hostname"
              v-model="hostname"
              name="hostname"
              type="text"
              required
              class="input rounded-t-md"
              placeholder="Hostname"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="input rounded-b-md"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">Connect</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useMikrotikStore } from "~/stores/mikrotik";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const mikrotik = useMikrotikStore();
const router = useRouter();

const hostname = ref("");
const password = ref("");
const error = ref("");

const handleConnect = async () => {
  const success = await mikrotik.connect(hostname.value, password.value);
  if (success) {
    auth.setMikrotikCredentials({
      hostname: hostname.value,
      password: password.value,
    });
    router.push("/dashboard");
  } else {
    error.value = "Failed to connect to Mikrotik server";
  }
};
</script>
