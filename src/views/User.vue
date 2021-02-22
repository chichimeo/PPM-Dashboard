<template>
  <section class="section">
    <box>
      <div slot="header">
        <div class="columns is-vcentered">
          <div class="column">
            {{ $l('components.user.dashboardUsers','Dashboard Users') }}
          </div>
          <div class="column is-narrow">
            <button
              v-if="isAdmin"
              class="button is-primary is-small"
              @click.prevent="showCreateForm"
            >
              <octicon :icon="plus" />&ensp;{{ $l('global.add','Add') }}
            </button>
          </div>
        </div>
      </div>

      <data-table
        ref="userTable"
        :key="currentLocale"
        :items="userListFunc"
        :per-page="10"
        :sort-desc="true"
        :theme="$_ui_theme_tables"
      >
        <data-column
          field="username"
          :label="$l('components.user.userName','Username')"
        />
        <data-column
          field="name"
          :label="$l('components.user.name','Name')"
        />
        <data-column
          field="type"
          :label="$l('components.user.type','Type')"
          :render="renderUserType"
        />
        <data-column
          field="group"
          :label="$l('components.user.group','Group')"
          :render="renderUserGroup"
        />
        <data-column
          :sortable="false"
          :label="$l('components.user.action','Action')"
          width="15%"
        >
          <template slot-scope="props">
            <button
              v-if="isAdmin || props.item.username === authenticationClaims.sub"
              class="button is-primary mx-1 my-1 is-small is-light"
              @click.prevent="showUpdateForm(props)"
            >
              {{ $l('global.edit','Edit') }}
            </button>
            <button
              v-if="isAdmin"
              class="button is-danger mx-1 my-1 is-small is-light"
              @click.prevent="deleteUser(props)"
            >
              {{ $l('global.delete','Delete') }}
            </button>
          </template>
        </data-column>
      </data-table>
    </box>

    <modal :show.sync="userForm">
      <box>
        <div slot="header">
          {{ formType === 'create' ? $l('components.user.createNewUser','Create New User'): $l('components.user.updateUser','Update User') }}
        </div>

        <div style="margin: auto; width:80%;">
          <div class="field">
            <label class="label">{{ $l('components.user.userName','Username') }}</label>
            <div class="control">
              <input
                v-if="formType === 'create'"
                v-model="form.username"
                type="text"
                class="input"
                placeholder="Username"
              >
              <input
                v-if="formType === 'update'"
                v-model="form.username"
                disabled
                type="text"
                class="input"
                placeholder="Username"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $l('components.user.name','Name') }}</label>
            <div class="control">
              <input
                v-model="form.name"
                type="text"
                class="input"
                placeholder="Name"
              >
            </div>
          </div>
          <div
            v-if="isAdmin"
            class="field"
          >
            <label class="label">{{ $l('components.user.type','Type') }}</label>
            <div class="control">
              <v-select
                v-if="formType === 'create'"
                v-model="selectedUserType"
                label="name"
                :options="userTypeOptions"
              />
              <input
                v-if="formType === 'update'"
                type="text"
                disabled
                class="input"
                :value="form.type == 0 ? 'Administrator' : 'Group Reporter'"
              >
            </div>
          </div>
          <div
            v-if="form.type === 1 && isAdmin"
            class="field"
          >
            <label class="label">{{ $l('components.user.group','Group') }}</label>
            <div class="control">
              <v-select
                v-model="form.group"
                :options="groupOptions"
                multiple
              />
            </div>
          </div>
          <div
            v-if="formType === 'update'"
            class="field"
          >
            <div v-if="form.type === 0 || !isAdmin">
              <label class="label">{{ $l('components.user.oldPassword','Old Password') }}</label>
              <div class="control">
                <input
                  v-model="form.oldPassword"
                  type="password"
                  class="input"
                  placeholder="Old Password"
                >
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $l('components.user.password','Password') }}</label>
            <div class="control">
              <input
                v-model="form.password"
                type="password"
                class="input"
                placeholder="Password"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">{{ $l('components.user.confirmPassword','Confirm Password') }}</label>
            <div class="control">
              <input
                v-model="form.confirmPassword"
                type="password"
                class="input"
                placeholder="Password"
              >
            </div>
          </div>
        </div>

        <div
          slot="footer"
          class="field is-grouped is-grouped-right"
        >
          <div class="control">
            <button
              v-if="formType === 'create'"
              class="button is-primary"
              @click.prevent="saveUser"
            >
              {{ $l('global.submit','Submit') }}
            </button>
            <button
              v-if="formType === 'update'"
              class="button is-primary"
              @click.prevent="updateUser"
            >
              {{ $l('global.update','Update') }}
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info"
              @click.prevent="userForm = false"
            >
              {{ $l('global.close','Close') }}
            </button>
          </div>
        </div>
      </box>
    </modal>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
import { DataTable, DataColumn, Modal } from '@cyradar/ui'
import { plus } from 'octicons-vue'
import GroupApi from '@/api/Group'
import UserApi from '@/api/User'

export default {
  name: 'ConfigurationUser',
  components: { DataTable, DataColumn, Modal, vSelect },
  data () {
    return {
      plus,
      userForm: false,
      formType: 'create',
      groupOptions: [],
      userTypeOptions: [
        { value: 0, name: 'Administrator' },
        { value: 1, name: 'Group Reporter' }
      ],
      selectedUserType: { value: 0, name: 'Administrator' },
      form: { type: 0 } // 0 for admin, 1 for reporter
    }
  },
  computed: {
    ...mapGetters([
      'authenticationClaims',
      'isAdmin',
      'currentLocale'
    ])
  },
  watch: {
    selectedUserType (val, oldVal) {
      this.form.type = val.value
    }
  },
  mounted () {
    this.fetchGroups()
  },
  methods: {
    saveUser () {
      if (!this.validateForm()) {
        return
      }
      UserApi.addUser(this.$http, this.form)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.userTable.loadItems()
          this.userForm = false
          this.resetForm('create')
        })
    },
    updateUser (props) {
      if (!this.validateForm()) {
        return
      }
      UserApi.updateUser(this.$http, this.form)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.userTable.loadItems()
          this.userForm = false
          this.resetForm('create')
        })
    },
    deleteUser (props) {
      UserApi.deleteUser(this.$http, props.item._id)
        .then(res => {
          this.$store.dispatch('NOTIFY', {
            type: 'success',
            text: res.message,
            duration: 10000
          })
          this.$refs.userTable.loadItems()
        })
    },
    showCreateForm () {
      this.resetForm('create')
      this.userForm = !this.userForm
    },
    showUpdateForm (props) {
      this.form = {
        _id: props.item._id,
        name: props.item.name,
        type: props.item.$_type,
        group: props.item.$_group,
        username: props.item.username
      }
      this.formType = 'update'
      this.userForm = !this.userForm
    },
    resetForm (type) {
      this.formType = type
      this.form = { type: this.selectedUserType.value }
    },
    validateForm () {
      if (this.formType === 'create') {
        if (!this.form.name || !this.form.username || !this.form.password || !this.form.confirmPassword) {
          this.$store.dispatch('NOTIFY', {
            type: 'warning',
            duration: 10000,
            error: {
              message: `Please fill all required fields`
            }
          })
          return false
        }
      }
      if (this.form.password !== this.form.confirmPassword) {
        this.$store.dispatch('NOTIFY', {
          type: 'warning',
          duration: 10000,
          error: {
            message: `Password does not match the confirm password`
          }
        })
        return false
      }
      return true
    },
    userListFunc (filtering, sorting, paging) {
      return UserApi.getUserVueTable(this.$http, filtering, sorting, paging)
        .then(res => res.data)
    },
    fetchGroups () {
      GroupApi.getGroupList(this.$http)
        .then(data => {
          let listGroup = data
          this.groupOptions = listGroup.map(group => group.name)
        })
    },
    renderUserType (val) {
      return val === 0 ? 'Administrator' : 'Group Reporter'
    },
    renderUserGroup (val) {
      return val.join(', ')
    }
  }
}
</script>

<style src="vue-select/dist/vue-select.css"></style>
