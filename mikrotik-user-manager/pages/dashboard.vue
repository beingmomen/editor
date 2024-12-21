<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold">Mikrotik User Manager</h1>
            </div>
          </div>
          <div class="flex items-center">
            <button @click="auth.logout" class="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- User Generation Form -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-lg font-medium mb-4">Generate Users</h2>
        <form @submit.prevent="handleGenerateUsers" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Number of Users</label
              >
              <input
                v-model="userCount"
                type="number"
                min="1"
                class="input w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Data Limit (KB)</label
              >
              <input
                v-model="dataLimit"
                type="number"
                min="1"
                class="input w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Expiration (Days)</label
              >
              <input
                v-model="expirationDays"
                type="number"
                min="1"
                class="input w-full"
              />
            </div>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary">
              Generate Users
            </button>
          </div>
        </form>
      </div>

      <!-- User List -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium">Generated Users</h2>
          <div class="space-x-2">
            <button @click="downloadUserList" class="btn btn-secondary">
              Download List
            </button>
            <button @click="downloadCommands" class="btn btn-secondary">
              Download Commands
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Expiration Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Data Limit (KB)
                </th>
                <th
                  v-if="auth.isAdmin"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in mikrotik.users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ user.username }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ formatDate(user.expirationDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ user.dataLimit }}
                </td>
                <td
                  v-if="auth.isAdmin"
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
                >
                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useMikrotikStore } from "~/stores/mikrotik";

const auth = useAuthStore();
const mikrotik = useMikrotikStore();

const userCount = ref(10);
const dataLimit = ref(1024); // 1MB in KB
const expirationDays = ref(30);

const handleGenerateUsers = async () => {
  await mikrotik.generateUsers(
    userCount.value,
    dataLimit.value,
    expirationDays.value
  );
};

const deleteUser = async (userId) => {
  await mikrotik.deleteUser(userId);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const downloadUserList = () => {
  const content = mikrotik.users
    .map(
      (user) =>
        `Username: ${user.username}\nExpiration: ${formatDate(
          user.expirationDate
        )}\nData Limit: ${user.dataLimit}KB\n---`
    )
    .join("\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "user-list.txt";
  a.click();
  URL.revokeObjectURL(url);
};

const downloadCommands = () => {
  const content = mikrotik.generateCommandScript(mikrotik.users);
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mikrotik-commands.txt";
  a.click();
  URL.revokeObjectURL(url);
};
</script>
