# 🇧🇩 BD Admin Boundary Data

A collection of structured administrative boundary data of Bangladesh including:

- Divisions
- Districts
- Upozilas
- Mouzas (fetched from DLRMS public API)

## 📚 Purpose

This project aims to make it easier for developers and researchers to access clean and structured location data for Bangladesh. Mouza data is dynamically fetched using a Node.js script that hits the official DLRMS API.

## 🗂️ Data Files

- `data/divisions.csv`: Static division data
- `data/districts.csv`: Static district data
- `data/upozilas.csv`: Static upozila data
- `data/mouzas.json`: Dynamically fetched mouza data

## ⚙️ How to Use

### 1. Clone the repo

```bash
git clone https://github.com/muktadirhosain/bd-admin-boundary-data.git
cd bd-admin-boundary-data
```