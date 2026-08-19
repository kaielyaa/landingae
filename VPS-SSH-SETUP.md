# VPS SSH deploy key — landingae

Setup ini biar VPS bisa `git pull`/`git clone` dari
`https://github.com/kaielyaa/landingae` lewat SSH (bukan HTTPS + token).

Kerjain di VPS (`ssh lantuns-vps`, atau lewat console provider), bukan di mesin dev.

## 1. Generate keypair khusus repo ini di VPS

Jangan copy private key dari mesin dev — generate baru langsung di VPS biar
private key-nya gak pernah keluar dari server.

```bash
ssh-keygen -t ed25519 -C "vps-landingae-deploy" -f ~/.ssh/id_ed25519_landingae -N ""
cat ~/.ssh/id_ed25519_landingae.pub
```

## 2. Tambahkan sebagai Deploy Key di GitHub

Buka: `https://github.com/kaielyaa/landingae/settings/keys` → **Add deploy key**
- Title: `vps-landingae-deploy` (atau bebas, asal jelas)
- Key: paste hasil `cat` di atas
- **Centang "Allow write access" HANYA kalau VPS perlu push balik.** Kalau VPS
  cuma pull buat deploy, biarin read-only (lebih aman).

## 3. Daftarkan Host alias di `~/.ssh/config` VPS

Deploy key itu khusus 1 repo — jadi kalau repo lain (`applantuns`,
`landinglantuns`) juga sudah/mau dipasang di VPS yang sama, gak bisa pakai
host `github.com` polos buat semuanya. Pakai alias:

```
# ~/.ssh/config di VPS
Host github-landingae
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_landingae
    IdentitiesOnly yes
```

## 4. Clone / set remote pakai alias itu

```bash
git clone github-landingae:kaielyaa/landingae.git
# atau kalau repo udah ada di VPS:
git remote set-url origin github-landingae:kaielyaa/landingae.git
```

## 5. Test

```bash
ssh -T github-landingae
# harus muncul: "Hi kaielyaa/landingae! You've successfully authenticated..."
git pull
```

Selesai. Lain kali update landing tinggal push dari dev machine ke GitHub,
lalu `git pull` di VPS pakai remote ini.
