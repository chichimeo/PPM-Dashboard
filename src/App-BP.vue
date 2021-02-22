<template>
  <div id="app">
    <dashboard>
      <template slot="login-right">
        <div class="has-text-centered">
          <a
            class="button is-primary"
            @click="$router.push({ name: 'download' })"
          >
            {{ $l('components.login.downloadCyEDR') }}
          </a>
        </div>
      </template>
      <template slot="login-header">
        <div class="has-text-centered">
          <div style="font-size: 1.4rem">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="$t('local.securitySystem')" />
          </div>
          <div>
            <img
              class="login__logo"
              src="@/assets/logo-white.svg"
            >
          </div>
        </div>
      </template>
      <template slot="login-footer">
        <div class="is-size-7">
          <strong>{{ $t('local.organization') }}</strong>
          <p>{{ $t('local.address') }}</p>
          <p>{{ $t('local.phone') }}&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('local.email') }}</p>
          <div
            class="level"
            style="margin-top: .4rem;"
          >
            <span class="level-left">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="$t('local.copyright')" />
              <a
                href="https://cyradar.com"
                target="_blank"
                class="has-text-white"
                rel="noopener noreferrer"
              >CyRadar
              </a>
            </span>
            <span class="level-right">
              <a
                href="/api/v1/view/download/agents/Huong_dan_setup_CyRadar_2020.pdf"
                target="_blank"
                class="has-text-white"
                rel="noopener noreferrer"
              >
                {{ $t('local.instructions') }}
              </a>
            </span>
          </div>
        </div>
      </template>
    </dashboard>
  </div>
</template>
<style src="@cyradar/ui/dist/ui.css"></style>
<script>
import { mapGetters } from 'vuex'
import jwt from 'jwt-decode'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'authenticationToken',
      'authenticationClaims',
      'groupList',
      'routes'
    ])
  },
  watch: {
    authenticationToken (val, oldVal) {
      if (!val) {
        this.$store.dispatch('AUTHENTICATION_SET_CLAIMS')
        return
      }
      this.$store.dispatch('AUTHENTICATION_SET_CLAIMS', jwt(val))
    },
    authenticationClaims (val, oldVal) {
      if (!val) {
        return
      }
      this.$store.dispatch('RELOAD_GROUP_LIST')
    },
    groupList (groupList) {
      let routes = this.routes
      let agentRoute = routes.find(e => e.name === 'agent')

      if (!agentRoute) {
        return
      }

      for (let i = 0; i < groupList.length; i++) {
        let children = []
        if (groupList[i].childGroups && groupList[i].childGroups.length > 0) {
          groupList[i].children = groupList.filter(e => groupList[i].childGroups.includes(e._id))
          children = groupList[i].children.map(e => {
            return {
              path: `/agent/${e._id}`,
              meta: { title: e.name }
            }
          })

          groupList = groupList.filter(e => !groupList[i].childGroups.includes(e._id))
        }
        groupList[i] = {
          path: `/agent/${groupList[i]._id}`,
          meta: { title: groupList[i].name },
          children: children
        }
      }

      agentRoute.children = groupList
      this.$store.commit('UPDATE_ROUTES', routes)
    }
  },
  mounted () {
    if (!this.authenticationToken) {
      this.$store.dispatch('AUTHENTICATION_SET_CLAIMS')
      return
    }
    this.$store.dispatch('AUTHENTICATION_SET_CLAIMS', jwt(this.authenticationToken))
  },
  i18n: {
    messages: {
      vi: {
        local: {
          securitySystem: '<span>HỆ THỐNG BẢO MẬT AN TOÀN THÔNG TIN </span><strong>TỈNH BÌNH PHƯỚC</strong>',
          organization: 'ĐƠN VỊ QUẢN TRỊ VÀ VẬN HÀNH: TRUNG TÂM CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG TỈNH BÌNH PHƯỚC',
          address: 'Địa chỉ: QL 14 - P.Tân Phú -Tx. Đồng Xoài - Bình Phước',
          phone: 'Điện thoại: (Zalo - Viber) 08 4468 9393 - 08 8877 8078',
          email: 'Email: hotro@binhphuoc.gov.vn',
          copyright: 'Một sản phẩm của&nbsp;',
          instructions: 'Hướng dẫn cài đặt'
        }
      },
      en: {
        local: {
          securitySystem: '<strong>BINH PHUOC </strong><span>INFORMATION SECURITY SYSTEM</span>',
          organization: "MANAGEMENT AND OPERATION: BINH PHUOC'S CENTER OF INFORMATION TECHNOLOGY AND COMMUNICATION",
          address: 'Address: Route 14 - Tan Phu - Dong Xoai - Binh Phuoc',
          phone: 'Phone: (Zalo - Viber) 08 4468 9393 - 08 8877 8078',
          email: 'Email: hotro@binhphuoc.gov.vn',
          copyright: 'Copyright &copy; 2020&nbsp;',
          instructions: 'Installation Instructions'
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import "assets/app.scss";
</style>
