export const getMedics = async () => {
  try {
    const clinic = JSON.parse(window.localStorage.getItem("clinic"))
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BEIFONG_API_URL}/api/medics/${clinic.clinicId}/clinics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log(error)
  }
}
