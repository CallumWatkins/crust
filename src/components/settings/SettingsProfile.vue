<script setup lang="ts">
</script>

<template>
  <div class="avatar-container">
    <img class="avatar" src="@/assets/placeholder-avatar.webp" alt="avatar">
    <div class="edit-avatar">
      <button class="button">Upload Profile Picture</button>
    </div>
  </div>
  <div class="profile-container">
    <div class="field-container">
      <div class="label">
        <strong>Username</strong>
        <p class="value">John James Smith</p>
      </div>
      <button class="button">Edit</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.avatar-container {
  display: flex;
  align-items: center;
  margin-bottom: calc(var(--spacing) * 4);
}

.avatar {
  width: 96px;
  border-radius: 100%;
}

.edit-avatar {
  margin-left: calc(var(--spacing) * 4);
}

.profile-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
}

.field-container {
  display: flex;
  justify-content: space-between;
}

.label {
  color: var(--text-color-dark);
  display: flex;
  flex-direction: column;
}

.value {
  color: var(--text-color);
  font-weight: normal;
}
</style>
